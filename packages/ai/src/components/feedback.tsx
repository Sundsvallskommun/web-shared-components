import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import React, { useEffect, useRef, useState } from 'react';
import { giveFeedback } from '../services';
import { ChatHistoryEntry } from '../types';

interface FeedbackProps extends React.ComponentPropsWithoutRef<'div'> {
  entry: ChatHistoryEntry;
  reasons?: string[];
}
export const Feedback = React.forwardRef<HTMLDivElement, FeedbackProps>((props, ref) => {
  const { entry, reasons: _reasons, ...rest } = props;
  const [showFeedbackReason, setShowFeedbackReason] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedback, setFeedback] = useState<-1 | 1 | null>(null);
  const feedbackRef = useRef<HTMLButtonElement>(null);
  const thumbDownButtonRef = useRef<HTMLButtonElement>(null);
  const thumbUpButtonRef = useRef<HTMLButtonElement>(null);

  const reasons = _reasons || ['Innehåller faktafel', 'Inte nöjd med svaret'];

  const sendFeedback = async (val: -1 | 1, reason?: string) => {
    setShowFeedbackReason(false);
    setShowThanks(false);
    setFeedbackLoading(true);

    setFeedback(val);
    await giveFeedback({ value: val, text: reason || null });
    setFeedbackLoading(false);
    setShowThanks(true);
    setTimeout(() => {
      const ref = val === 1 ? thumbUpButtonRef : thumbDownButtonRef;
      if (ref.current) {
        ref.current.focus();
      }
    }, 10);
  };

  const handleFeedback = (val: -1 | 1) => {
    if (val === -1) {
      setShowFeedbackReason(true);
      setTimeout(() => {
        feedbackRef.current?.focus();
      }, 10);
    } else {
      sendFeedback(val);
    }
  };

  useEffect(() => {
    setShowThanks(false);
    setShowFeedbackReason(false);
  }, [entry]);

  const CloseFeedbackButton = () => (
    <Button
      iconButton
      aria-label="Stäng"
      variant="tertiary"
      size="sm"
      showBackground={false}
      onClick={() => {
        setShowFeedbackReason(false);
        setShowThanks(false);
        if (showFeedbackReason) {
          if (thumbDownButtonRef.current) {
            thumbDownButtonRef.current.focus();
          }
        } else {
          if (thumbUpButtonRef.current) {
            thumbUpButtonRef.current.focus();
          }
        }
      }}
    >
      <Icon name="x" size={28} />
    </Button>
  );

  return (
    <div ref={ref} {...rest}>
      <div className="sk-ai-feedback">
        <Button
          ref={thumbUpButtonRef}
          iconButton
          aria-label="Bra svar"
          variant="tertiary"
          size="sm"
          showBackground={false}
          data-current={feedback === 1}
          className="sk-ai-feedback-button"
          onClick={() => handleFeedback(1)}
        >
          <Icon name="thumbs-up" />
        </Button>
        <Button
          ref={thumbDownButtonRef}
          iconButton
          aria-label="Dåligt svar"
          aria-haspopup="true"
          aria-expanded={showFeedbackReason}
          aria-controls="sk-ai-feedback-reason"
          variant="tertiary"
          showBackground={false}
          size="sm"
          data-current={feedback === -1}
          className="sk-ai-feedback-button"
          onClick={() => handleFeedback(-1)}
        >
          <Icon name="thumbs-down" />
        </Button>
      </div>
      {showFeedbackReason || feedbackLoading || showThanks ? (
        <div className="sk-ai-feedback-more">
          <>
            <div className="sk-ai-feedback-more-header">
              <span>
                {showFeedbackReason ? 'Berätta mer' : feedbackLoading ? 'Skickar feedback' : 'Tack för din feedback'}
              </span>
              <CloseFeedbackButton />
            </div>
            {showFeedbackReason ? (
              <div className="sk-ai-feedback-more-reason" role="dialog" id="sk-ai-feedback-reason">
                {reasons.map((reason, index) => (
                  <Button
                    key={`reason-${index}`}
                    role="menuitem"
                    ref={index === 0 ? feedbackRef : null}
                    variant="secondary"
                    size="sm"
                    onClick={() => sendFeedback(-1, reason)}
                  >
                    {reason}
                  </Button>
                ))}
              </div>
            ) : null}
          </>
        </div>
      ) : null}
    </div>
  );
});
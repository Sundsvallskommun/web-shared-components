import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import React, { useRef, useState } from 'react';
import { giveFeedback } from '../services';
import { useSessions } from '../session-store';

interface FeedbackProps extends React.ComponentPropsWithoutRef<'div'> {
  sessionId: string;
  reasons?: string[];
  onGiveFeedback?: (value: -1 | 1) => void;
}
export const Feedback = React.forwardRef<HTMLDivElement, FeedbackProps>((props, ref) => {
  const { sessionId, reasons: _reasons, onGiveFeedback, ...rest } = props;
  const [session, updateSession] = useSessions((state) => [state.sessions[sessionId], state.updateSession]);
  const [showFeedbackReason, setShowFeedbackReason] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedback, setFeedback] = useState<-1 | 1 | undefined>(session.feedback?.value);
  const feedbackRef = useRef<HTMLButtonElement>(null);
  const thumbDownButtonRef = useRef<HTMLButtonElement>(null);
  const thumbUpButtonRef = useRef<HTMLButtonElement>(null);

  const reasons = _reasons || ['Innehåller faktafel', 'Inte nöjd med svaret'];

  const sendFeedback = async (val: -1 | 1, reason?: string) => {
    setShowFeedbackReason(false);
    setShowThanks(false);
    setFeedbackLoading(true);
    setFeedback(val);
    onGiveFeedback && onGiveFeedback(val);
    await giveFeedback({ value: val, text: reason || null }, sessionId);
    setFeedbackLoading(false);
    setShowThanks(true);
    onGiveFeedback && onGiveFeedback(val);
    updateSession(sessionId, (session) => ({ ...session, feedback: { value: val, text: reason || null } }));
  };

  const handleFeedback = (val: -1 | 1) => {
    if (val === -1) {
      sendFeedback(-1);
      setShowFeedbackReason(true);
      setTimeout(() => {
        feedbackRef.current?.focus();
      }, 10);
    } else {
      sendFeedback(val);
    }
  };

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
          showBackground={feedback === 1}
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
          showBackground={feedback === -1}
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

import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { Bubble } from '../bubble';
import { AIServiceModuleDefaultProps } from './ai-service-module';

interface QuestionsWithLangauge {
  question: string;
  lang: string;
}

type Question = string | QuestionsWithLangauge;

export interface AIServiceModuleQuestionsEssentialProps {
  /**
   * Heading / Title for questions sidebar.
   * Will be wrapped in `<h3>` if no element is provided.
   * @default "Vanliga frågor"
   */
  questionsTitle?: React.ReactNode;
  questions?: Question[];
  onSelectQuestion?: (question: string) => void;
}

interface AIServiceModuleQuestionsProps
  extends AIServiceModuleQuestionsEssentialProps,
    AIServiceModuleDefaultProps,
    React.ComponentPropsWithoutRef<'div'> {}

export const AIServiceModuleQuestions = React.forwardRef<HTMLDivElement, AIServiceModuleQuestionsProps>(
  (props, ref) => {
    const {
      className,
      questions,
      questionsTitle = 'Vanliga frågor',
      color,
      inverted,
      onSelectQuestion,
      ...rest
    } = props;

    return (
      <aside ref={ref} className={cx('sk-ai-service-module-questions', className)} data-inverted={inverted} {...rest}>
        {questionsTitle && (
          <div className="sk-ai-service-module-questions-title">
            {typeof questionsTitle === 'string' ? <h3>{questionsTitle}</h3> : questionsTitle}
          </div>
        )}
        {questions && (
          <ul className="sk-ai-service-module-questions-list">
            {questions.map((item, index) => {
              const question = typeof item === 'string' ? item : item.question;
              const lang = typeof item === 'object' ? item.lang : undefined;
              return (
                <li key={`sk-ai-sm-question-${index}`}>
                  <Bubble color={color} lang={lang} onClick={() => onSelectQuestion && onSelectQuestion(question)}>
                    {question}
                  </Bubble>
                </li>
              );
            })}
          </ul>
        )}
      </aside>
    );
  }
);

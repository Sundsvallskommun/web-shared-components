import React from 'react';
import { AIFeedAvatar, AssistantInfo } from '../types';
import { cx } from '@sk-web-gui/utils';
import { Avatar } from '@sk-web-gui/avatar';

export interface AssistantPresentationProps extends React.ComponentPropsWithoutRef<'div'> {
  assistant: AssistantInfo;
  size?: 'lg' | 'sm';
  avatar?: AIFeedAvatar;
}

export const AssistantPresentation = React.forwardRef<HTMLDivElement, AssistantPresentationProps>((props, ref) => {
  const { className, assistant, size = 'lg', avatar, ...rest } = props;

  const getDefaultDescription = () => {
    switch (typeof assistant.description) {
      case 'string':
        return assistant.description;
      case 'object':
        return assistant.description?.default || undefined;
      default:
        return undefined;
    }
  };

  const AssistantAvatar: React.FC = () => {
    if (avatar) {
      if (avatar.type === Avatar) {
        return React.cloneElement(avatar, {
          ...avatar.props,
          size: 'lg',
          imageAlt: '',
          'aria-hidden': 'true',
        });
      } else {
        return avatar;
      }
    } else {
      return (
        <Avatar
          size="lg"
          aria-hidden
          imageElement={typeof assistant.avatar !== 'string' ? assistant.avatar : undefined}
          imageUrl={typeof assistant.avatar === 'string' ? assistant.avatar : undefined}
          initials={assistant.shortName}
          imageAlt=""
        />
      );
    }
  };

  const languages =
    typeof assistant.description === 'object'
      ? Object.keys(assistant.description).filter((key) => key !== 'default')
      : undefined;

  const getLanguageDescriptions = (language: string): string | undefined => {
    if (typeof assistant.description === 'object') {
      return assistant.description[language];
    }

    return undefined;
  };

  return (
    <div ref={ref} className={cx('sk-ai-assistant-presentation', className)} data-size={size} {...rest}>
      <AssistantAvatar />
      <div className="sk-ai-assistant-presentation-header">
        <div className="sk-ai-assistant-presentation-header-title">{assistant.name}</div>
        <div className="sk-ai-assistant-presentation-header-descriptions">
          {getDefaultDescription() && (
            <div className="sk-ai-assistant-presentation-header-description">{getDefaultDescription()}</div>
          )}
          {languages &&
            languages.map((lang, index) => (
              <div key={`${lang}-${index}`} lang={lang} className="sk-ai-assistant-presentation-header-description">
                {getLanguageDescriptions(lang)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});

import { Alert } from '@sk-web-gui/alert';
import { Button } from '@sk-web-gui/button';
import React from 'react';

interface SwatchProps {
  label: string;
  className: string;
  textClassName?: string;
}

const Swatch: React.FC<SwatchProps> = ({ label, className, textClassName = 'text-light-primary' }) => (
  <div
    className={`flex items-center justify-center rounded-md p-md ${className} ${textClassName}`}
    style={{ minHeight: '5.6rem', minWidth: '17rem' }}
  >
    <span style={{ fontSize: '1.2rem', fontFamily: 'monospace' }}>{label}</span>
  </div>
);

const Section: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({
  title,
  description,
  children,
}) => (
  <section style={{ marginBottom: '3.2rem' }}>
    <h2 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{title}</h2>
    <p style={{ marginBottom: '1.6rem', maxWidth: '64rem' }}>{description}</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.6rem', alignItems: 'flex-start' }}>{children}</div>
  </section>
);

// A rendered component plus a monospace caption explaining which colour token it pulls from.
const ComponentCard: React.FC<{ caption: string; children: React.ReactNode }> = ({ caption, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
    <div>{children}</div>
    <span style={{ fontSize: '1.1rem', fontFamily: 'monospace', maxWidth: '24rem', color: 'inherit', opacity: 0.8 }}>
      {caption}
    </span>
  </div>
);

export const PaletteDemo: React.FC = () => (
  <div style={{ padding: '2.4rem' }}>
    <h1 style={{ fontSize: '3.2rem', marginBottom: '0.8rem' }}>Org-teman</h1>
    <p style={{ marginBottom: '2.4rem', maxWidth: '64rem' }}>
      Använd <strong>Org-tema</strong>-väljaren i Storybook-headern för att växla mellan{' '}
      <strong>Sundsvall</strong> (standard) och <strong>Aldeeran</strong> (exempel-organisation). Brand-rollerna
      och neutralerna byter färg — feedback-färgerna ska stå still. Komponenter som fortfarande använder
      plats-namnen (vattjom m.fl.) följer <em>inte</em> org-temat; det är därför de behöver migreras till
      roll-tokens.
    </p>

    <Section
      title="Komponenter"
      description="Riktiga komponenter färgade via temat. Olika komponenter kan hämta olika roller — en Button på rollen action och en på accent ger två olika temafärger (Sundsvall: blå resp. lila; Aldeeran: teal resp. amber). Feedback-färgade komponenter och de som ännu använder plats-namn står still när du växlar org-tema."
    >
      <ComponentCard caption='Button color="action" — följer org-temat'>
        <Button color="action">Primär åtgärd</Button>
      </ComponentCard>
      <ComponentCard caption='Button color="accent" — egen roll (Sundsvall: lila, Aldeeran: amber)'>
        <Button color="accent">Framlyft</Button>
      </ComponentCard>
      <ComponentCard caption='Button color="error" — feedback, oförändrad'>
        <Button color="error">Ta bort</Button>
      </ComponentCard>
      <ComponentCard caption='Button variant="link" — länkfärg följer org-temat'>
        <Button variant="link">Läs mer</Button>
      </ComponentCard>
      <ComponentCard caption='Button variant="secondary" — neutral, oförändrad (transparent yta, neutral text)'>
        <Button variant="secondary">Avbryt</Button>
      </ComponentCard>
      <ComponentCard caption='Alert type="info" — använder ännu plats-namnet vattjom → följer INTE org-temat'>
        <div style={{ width: '30rem' }}>
          <Alert type="info">
            <Alert.Icon />
            <Alert.Content>
              <Alert.Content.Title>Information</Alert.Content.Title>
              <Alert.Content.Description>Den här rutan ligger kvar på plats-namnet vattjom.</Alert.Content.Description>
            </Alert.Content>
          </Alert>
        </div>
      </ComponentCard>
      <ComponentCard caption='Alert type="error" — feedback, oförändrad'>
        <div style={{ width: '30rem' }}>
          <Alert type="error">
            <Alert.Icon />
            <Alert.Content>
              <Alert.Content.Title>Fel</Alert.Content.Title>
              <Alert.Content.Description>Feedback-färger delas mellan alla org-teman.</Alert.Content.Description>
            </Alert.Content>
          </Alert>
        </div>
      </ComponentCard>
    </Section>

    <Section
      title="Brand-roller (byter med org-tema)"
      description="action / brand / accent / alert. Sundsvall: action/brand = vattjom-blå, accent = bjornstigen-lila, alert = juniskar-rosa. Aldeeran: action/brand/alert = teal, accent = amber. (accent/alert är provisoriska tills UX bestämt rollerna.)"
    >
      <Swatch label="bg-action-surface-primary" className="bg-action-surface-primary" />
      <Swatch label="bg-action-surface-accent" className="bg-action-surface-accent" textClassName="text-dark-primary" />
      <Swatch label="bg-brand-surface-primary" className="bg-brand-surface-primary" />
      <Swatch label="bg-accent-surface-primary" className="bg-accent-surface-primary" />
      <Swatch label="bg-alert-surface-primary" className="bg-alert-surface-primary" />
    </Section>

    <Section
      title="Neutraler (byter med org-tema)"
      description="background / primary-ramp / text. Sundsvall = neutral grå, Aldeeran = sval skiffer (blå-ton)."
    >
      <Swatch label="bg-primary-700" className="bg-primary-700" />
      <Swatch label="bg-primary-500" className="bg-primary-500" />
      <Swatch label="bg-primary-300" className="bg-primary-300" textClassName="text-dark-primary" />
      <Swatch label="bg-background-100" className="bg-background-100" textClassName="text-dark-primary" />
      <Swatch label="bg-background-200" className="bg-background-200" textClassName="text-dark-primary" />
    </Section>

    <Section
      title="Feedback (oförändrat)"
      description="success / warning / error / info ska se likadana ut i båda org-temana. Byter de hue är något fel."
    >
      <Swatch label="bg-info-surface-primary" className="bg-info-surface-primary" />
      <Swatch label="bg-success-surface-primary" className="bg-success-surface-primary" />
      <Swatch label="bg-warning-surface-primary" className="bg-warning-surface-primary" />
      <Swatch label="bg-error-surface-primary" className="bg-error-surface-primary" />
    </Section>

    <Section
      title="Legacy plats-namn (följer inte org-temat)"
      description="vattjom / gronsta / juniskar / bjornstigen ligger kvar oförändrade under deprecation-perioden. De svarar inte på org-temat — komponenter som använder dem ser likadana ut oavsett organisation tills de migrerats."
    >
      <Swatch label="bg-vattjom-surface-primary" className="bg-vattjom-surface-primary" />
      <Swatch label="bg-gronsta-surface-primary" className="bg-gronsta-surface-primary" />
      <Swatch label="bg-juniskar-surface-primary" className="bg-juniskar-surface-primary" />
      <Swatch label="bg-bjornstigen-surface-primary" className="bg-bjornstigen-surface-primary" />
    </Section>
  </div>
);

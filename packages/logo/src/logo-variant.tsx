import { Logo as LogoSvg, Symbol } from './assets';
  
  interface RenderLogoProps {
    variant: 'logo' | 'symbol' | 'service';
    logo?: React.ReactNode;
    symbol?: React.ReactNode;
  }

  export const RenderLogo = (props: RenderLogoProps) => {
    const variantMap = {
      logo: props.logo || <LogoSvg aria-label="Sundsvalls kommun logotyp"/>,
      symbol: props.symbol || <Symbol aria-label="Sundsvalls kommun symbol"/>,
      service: props.symbol || <Symbol aria-label="Sundsvalls kommun symbol"/>,
    };

    return variantMap[props.variant] || null;

  };
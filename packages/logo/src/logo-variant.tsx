import { Logo as LogoSvg, Symbol } from './assets';
  
  interface RenderLogoProps {
    variant: 'logo' | 'symbol' | 'service';
    logo?: React.ReactNode;
    symbol?: React.ReactNode;
  }

  export const RenderLogo = (props: RenderLogoProps) => {
    const variantMap = {
      logo: props.logo || <LogoSvg />,
      symbol: props.symbol || <Symbol />,
      service: props.symbol || <Symbol />,
    };

    return variantMap[props.variant] || null;

  };
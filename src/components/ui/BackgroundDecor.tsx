/**
 * BackgroundDecor Component
 *
 * Reusable decorative background elements (gradient orbs/blobs)
 * Replaces 200+ lines of duplicated decoration code
 */

export type OrbPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'center-left'
  | 'center-right'
  | 'center';

export type OrbSize = 'sm' | 'md' | 'lg' | 'xl';

export type OrbColor = 'brand' | 'blue' | 'orange' | 'success' | 'purple' | 'pink';

export interface Orb {
  position: OrbPosition;
  size?: OrbSize;
  colors?: [OrbColor, OrbColor];
  animate?: boolean;
  opacity?: number;
  animationDelay?: string;
}

export interface BackgroundDecorProps {
  orbs?: Orb[];
  variant?: 'default' | 'animated' | 'subtle';
  className?: string;
}

// Decorative blurred orbs were removed from the design. The component is kept
// (rendering nothing) so existing callers keep compiling; remove usages over time.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BackgroundDecor(_props: BackgroundDecorProps) {
  return null;
}

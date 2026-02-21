---
name: figma-to-rn
description: 
  Use this skill when the user asks to implement, build, create, or translate a Figma design, screen, or component into React Native code. Also applies when a Figma URL, node ID, or design file is mentioned alongside any build/code request (e.g. "implement this design", "build from Figma", "translate this screen", "code up this component from Figma").
---

# Figma → React Native Implementation Skill

## Step 1: Extract Design Context Before Writing Any Code

Always call `mcp__figma-desktop__get_design_context` first. Never guess at colors, spacing, typography, or layout from a description alone.

```
1. mcp__figma-desktop__get_design_context  ← always first
2. mcp__figma-desktop__get_variable_defs   ← if design uses Figma variables/tokens
3. mcp__figma-desktop__get_screenshot      ← to display the reference alongside your output
```

If the user provides a Figma URL, extract the node ID from it:
- URL format: `https://figma.com/design/:fileKey/:fileName?node-id=1-2` → nodeId is `1:2`
- Branch format: `https://figma.com/design/:fileKey/branch/:branchKey/...` → use branchKey as fileKey

---

## Step 2: Map Figma Properties → NativeWind 4 Classes

| Figma Property | NativeWind className |
|---|---|
| Fill color | `bg-[#hex]` or theme token class |
| Text color | `text-[#hex]` or token |
| Font size | `text-[16px]` or scale step (`text-sm`, `text-base`, `text-lg`, etc.) |
| Font weight | `font-thin` / `font-normal` / `font-medium` / `font-semibold` / `font-bold` |
| Line height | `leading-[value]` |
| Letter spacing | `tracking-[value]` |
| Corner radius | `rounded-[value]` (e.g. `rounded-2xl`, `rounded-full`, `rounded-[12px]`) |
| Padding (uniform) | `p-[n]` |
| Padding (asymmetric) | `px-[n] py-[n]` or `pt-` `pr-` `pb-` `pl-` |
| Gap (Auto Layout) | `gap-[n]` |
| Auto Layout horizontal | `flex flex-row` |
| Auto Layout vertical | `flex flex-col` |
| Alignment | `items-center`, `items-start`, `items-end`, `justify-between`, `justify-center`, etc. |
| Width / Height | `w-[value]` / `h-[value]` or `w-full`, `flex-1` |
| Shadow / Elevation | `shadow-sm`, `shadow-md`, `shadow-lg`, or `shadow-[value]` |
| Opacity | `opacity-[value]` |
| Border | `border border-[#hex]` or `border-[width]` |

**Base unit:** Figma uses pixels; NativeWind's default scale is 4pt. For arbitrary values use `[value]` syntax (e.g. `p-[18px]`, `rounded-[10px]`).

---

## Step 3: Figma Variables → Project Theme Tokens

If `get_variable_defs` returns variables, map them to `src/theme/` tokens rather than hardcoding hex values. Example:

```ts
// src/theme/colors.ts — add or reference existing tokens
export const colors = {
  primary: '#6366F1',   // maps to Figma variable "color/brand/primary"
  surface: '#1E1E2E',   // maps to "color/surface/default"
  // ...
};
```

Reference them via NativeWind's theme config (`tailwind.config.js`) or as inline `bg-[${colors.primary}]` if not in config.

---

## Step 3.5: Dark Mode Implementation

`tailwind.config.js` sets `darkMode: 'class'`. NativeWind 4 activates `dark:` classes automatically when `ThemeContext` calls `setColorScheme('dark')` — no extra setup needed per component.

### 3.5.1 — Detect Figma dark variants

When calling `get_variable_defs`, look for variable **modes** named `Light` / `Dark` (or similar). Each variable will have a value per mode. Map both modes to NativeWind `dark:` class pairs:

| Figma variable | Light mode value | Dark mode value | NativeWind classes |
|---|---|---|---|
| `color/background/default` | `#FFFFFF` | `#0F172A` | `bg-white dark:bg-neutral-900` |
| `color/surface/card` | `#F8FAFC` | `#1E293B` | `bg-neutral-50 dark:bg-neutral-800` |
| `color/text/primary` | `#0F172A` | `#F8FAFC` | `text-neutral-900 dark:text-neutral-50` |
| `color/text/secondary` | `#64748B` | `#94A3B8` | `text-neutral-500 dark:text-neutral-400` |
| `color/border/default` | `#E2E8F0` | `#334155` | `border-neutral-200 dark:border-neutral-700` |

If the design has no Figma variable modes, apply dark mode pairing manually using the neutral scale as the convention (see 3.5.2).

### 3.5.2 — Neutral scale dark mode convention

The project neutral palette runs from `neutral-0` (white) → `neutral-950` (near-black). Apply these pairing rules consistently:

| Role | Light class | Dark class | Combined |
|---|---|---|---|
| Screen background | `bg-white` | `dark:bg-neutral-900` | `bg-white dark:bg-neutral-900` |
| Card / sheet surface | `bg-neutral-50` | `dark:bg-neutral-800` | `bg-neutral-50 dark:bg-neutral-800` |
| Elevated card | `bg-neutral-100` | `dark:bg-neutral-700` | `bg-neutral-100 dark:bg-neutral-700` |
| Input background | `bg-neutral-100` | `dark:bg-neutral-800` | `bg-neutral-100 dark:bg-neutral-800` |
| Primary text | `text-neutral-900` | `dark:text-neutral-50` | `text-neutral-900 dark:text-neutral-50` |
| Secondary text | `text-neutral-500` | `dark:text-neutral-400` | `text-neutral-500 dark:text-neutral-400` |
| Placeholder / hint | `text-neutral-400` | `dark:text-neutral-500` | `text-neutral-400 dark:text-neutral-500` |
| Divider / border | `border-neutral-200` | `dark:border-neutral-700` | `border-neutral-200 dark:border-neutral-700` |
| Icon (muted) | `text-neutral-400` | `dark:text-neutral-500` | (same) |
| Overlay scrim | `bg-black/50` | `dark:bg-black/70` | `bg-black/50 dark:bg-black/70` |

Primary / accent brand colors (`bg-primary-500`, `text-primary-400`, etc.) typically don't need a `dark:` pair — they are already vibrant enough on dark backgrounds. Only add a `dark:` variant if the Figma design specifies a distinct dark-mode shade.

### 3.5.3 — NativeWind `dark:` prefix usage

Apply `dark:` variants inline with the light-mode class. **Every background, text, and border color should have a `dark:` pair** unless it is a brand/accent color or intentionally the same in both modes:

```tsx
// ✓ correct — always pair bg + dark:bg, text + dark:text, border + dark:border
<View className="bg-white dark:bg-neutral-900 px-base py-lg">
  <Text className="text-neutral-900 dark:text-neutral-50 text-h3 font-jakarta-semibold">
    Balance
  </Text>
  <Text className="text-neutral-500 dark:text-neutral-400 text-body mt-xs">
    Available
  </Text>
  <View className="border border-neutral-200 dark:border-neutral-700 rounded-md mt-md" />
</View>

// ✓ brand color — same in both modes, no dark: needed
<Pressable className="bg-primary-500 rounded-xl px-lg h-btn items-center justify-center">
  <Text className="text-white text-body-lg font-jakarta-semibold">Send</Text>
</Pressable>
```

### 3.5.4 — Programmatic dark mode with `isDark` (for `style={}` props)

NativeWind `dark:` classes only work in `className`. For `style={}` props — Animated values, react-native-svg `color`/`fill`, `LinearGradient` stops, shadow colors — use `isDark` from `useTheme()`:

```tsx
import { useTheme } from '@theme/useTheme';
import { colors } from '@theme/tokens';

const MyCard = () => {
  const { isDark } = useTheme();

  return (
    <View
      style={{
        shadowColor: isDark ? '#000' : '#94A3B8',
        shadowOpacity: isDark ? 0.5 : 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      }}
      className="bg-white dark:bg-neutral-800 rounded-2xl p-base"
    >
      {/* content */}
    </View>
  );
};
```

### 3.5.5 — SVG icons in dark mode

Pass a `color` prop derived from `isDark` so icons invert correctly:

```tsx
import { useTheme } from '@theme/useTheme';
import ArrowRightIcon from '@components/ui/icons/ArrowRightIcon';

const { isDark } = useTheme();

<ArrowRightIcon
  size={20}
  color={isDark ? '#F8FAFC' : '#0F172A'}  // neutral-50 / neutral-900
/>

// For accent icons, keep the same color in both modes:
<WalletIcon size={24} color="#1A6FEF" />  // primary-500 — no change needed
```

### 3.5.6 — Component template with full dark mode

```tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '@theme/useTheme';

interface Props {
  title: string;
  subtitle?: string;
  onPress: () => void;
}

const TransactionCard = ({ title, subtitle, onPress }: Props) => {
  const { isDark } = useTheme();

  return (
    <Pressable
      className="
        bg-neutral-50 dark:bg-neutral-800
        border border-neutral-200 dark:border-neutral-700
        rounded-2xl px-base py-md
        flex flex-row items-center gap-md
        active:opacity-pressed
      "
      style={{
        shadowColor: isDark ? '#000' : '#94A3B8',
        shadowOpacity: isDark ? 0.3 : 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      }}
      onPress={onPress}
      accessibilityLabel={title}
    >
      <View className="flex-1">
        <Text
          className="text-neutral-900 dark:text-neutral-50 text-body-lg font-jakarta-semibold"
          allowFontScaling={false}
        >
          {title}
        </Text>
        {subtitle && (
          <Text className="text-neutral-500 dark:text-neutral-400 text-small mt-xxs">
            {subtitle}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default TransactionCard;
```

### 3.5.7 — Toggle / theme switcher pattern

If the screen/component needs a toggle button to switch modes:

```tsx
import { useTheme } from '@theme/useTheme';

const ThemeToggle = () => {
  const { isDark, toggleColorScheme } = useTheme();

  return (
    <Pressable
      className="items-center justify-center"
      style={{ minWidth: 44, minHeight: 44 }}
      onPress={toggleColorScheme}
      accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <SunIcon size={20} color="#F8FAFC" /> : <MoonIcon size={20} color="#0F172A" />}
    </Pressable>
  );
};
```

---

## Step 4: Project Conventions to Follow

### File Placement
- **Shared UI primitives** → `src/components/ui/`
- **Shared domain components** → `src/components/shared/`
- **Feature screens** → `src/features/<module>/screens/`
- **Feature components** → `src/features/<module>/components/`

### Path Aliases (always use these, never relative `../../`)
```ts
import { Button } from '@components/ui/Button';
import { useTheme } from '@theme/ThemeContext';
import { formatCurrency } from '@utils/currency';
```

### Code Style
- Single quotes everywhere
- No parens on single-arg arrows: `x => x` not `(x) => x`
- Trailing commas in objects, arrays, and function params
- TypeScript: always define a `Props` interface for every component

### Component Template
```tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

const MyComponent = ({ title, onPress }: Props) => {
  return (
    <Pressable
      className="flex flex-row items-center justify-center px-4 py-3 rounded-2xl bg-[#6366F1]"
      onPress={onPress}
    >
      <Text className="text-white text-base font-semibold">{title}</Text>
    </Pressable>
  );
};

export default MyComponent;
```

---

## Step 5: Component Primitives to Use

### React Native core (with NativeWind `className`)
- `View` — containers, layout
- `Text` — all text
- `Pressable` — interactive elements (preferred over `TouchableOpacity`)
- `TouchableOpacity` — acceptable alternative
- `ScrollView` / `FlatList` — scrollable content or `FlashList` if installed
- `Image` / `ImageBackground` — images
- `TextInput` — form inputs

### Gluestack UI v2 primitives (for complex interactive components) if installed
- `Box`, `HStack`, `VStack` — layout
- `Button`, `ButtonText` — actions
- `Input`, `InputField` — form inputs
- `Modal`, `ModalContent` — overlays
- `Badge` — status labels
- `Avatar`, `AvatarImage` — user avatars
- `Progress` — progress bars
- `Spinner` — loading states

---

## Step 6: Safe Area & Screen Awareness

For full-screen components (screens, modals):
```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MyScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {/* content */}
    </View>
  );
};
```

Or use `<SafeAreaView>` from `react-native-safe-area-context` directly.

---

## Step 7: Responsive Design (Phone-First)

**Priority order:** iOS phone → Android phone → iPad → Android tablet.
Design from Figma is typically delivered at iPhone 14 Pro size (390×844 pt). Everything must scale gracefully beyond that.

### 7.1 — Never use hardcoded pixel dimensions for layout
```tsx
// ❌ bad — breaks on larger/smaller screens
<View style={{ width: 390, height: 200 }} />

// ✓ good — flex-based
<View className="w-full h-48" />

// ✓ good — percentage-based when needed
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
<View style={{ width: width * 0.9 }} />
```

### 7.2 — Use a screen-size utility for adaptive values
Create or use a helper that returns values relative to screen width so spacing and font sizes scale proportionally across devices:

```ts
// src/utils/responsive.ts
import { Dimensions, PixelRatio } from 'react-native';

const BASE_WIDTH = 390; // iPhone 14 Pro design base
const { width: SCREEN_WIDTH } = Dimensions.get('window');

/** Scale a size from the 390pt design base to the current screen width */
export const rs = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel((size / BASE_WIDTH) * SCREEN_WIDTH));
```

Use `rs()` only for values that must scale (large hero elements, chart widths). For standard spacing/typography, NativeWind's fixed scale is fine on phones.

### 7.3 — Breakpoint-aware layouts (tablet support)
Detect tablet/large screen and switch layout where needed:

```ts
// src/utils/responsive.ts (add to same file)
export const isTablet = () => SCREEN_WIDTH >= 768;
export const isSmallPhone = () => SCREEN_WIDTH < 375;
```

Usage pattern — phone shows stacked layout, tablet shows side-by-side:
```tsx
import { isTablet } from '@utils/responsive';

<View className={isTablet() ? 'flex-row gap-6' : 'flex-col gap-4'}>
  <LeftPanel />
  <RightPanel />
</View>
```

### 7.4 — Font scaling
Disable automatic font scaling on UI labels to prevent layout breaks on accessibility large-text settings, but keep it on body/paragraph text:

```tsx
// UI labels, buttons, headings — lock scale
<Text className="text-base font-semibold" allowFontScaling={false}>Balance</Text>

// Body text — allow scaling for accessibility
<Text className="text-sm text-gray-500">Transaction description</Text>
```

### 7.5 — Touch target sizes
Minimum 44×44 pt on iOS, 48×48 dp on Android. Enforce with `minWidth`/`minHeight` or padding:

```tsx
<Pressable
  className="items-center justify-center"
  style={{ minWidth: 44, minHeight: 44 }}
  onPress={onPress}
>
  <ArrowRightIcon size={20} />
</Pressable>
```

### 7.6 — iPad-specific considerations
- Use `maxWidth` containers to prevent content stretching too wide: `style={{ maxWidth: 600, alignSelf: 'center', width: '100%' }}`
- Navigation: consider `react-navigation` split-view or drawer on tablets if the feature warrants it
- Modal/sheet widths: cap at `min(screenWidth * 0.9, 560)` on tablets

### 7.7 — Orientation awareness (when relevant)
If the screen has a meaningful landscape layout, listen for dimension changes:

```tsx
import { useDimensions } from '@react-native-community/hooks'; // if installed
// or
import { useWindowDimensions } from 'react-native';

const { width, height } = useWindowDimensions(); // re-renders on rotation
const isLandscape = width > height;
```

---

## Step 8: SVG Icons

If the design includes SVG icons, follow this exact workflow:

### 8.1 — Get the SVG from Figma

1. Call `mcp__figma-desktop__get_design_context` on the icon node.
   - If Figma returns an `<img>` tag with `src` pointing to a localhost URL
     (e.g. `http://localhost:3845/assets/<hash>.svg`), the SVG is hosted
     on the Figma local asset server — `WebFetch` **cannot** access it.
   - Use Bash `curl` to fetch the raw SVG markup:

     ```bash
     curl -s "http://localhost:3845/assets/<hash>.svg"
     ```

   - Parse the returned SVG and convert to `react-native-svg` (Step 8.3).

2. If Figma returns inline SVG markup directly in the code output,
   use it as-is without a `curl` step.

### 8.2 — Save the raw SVG file
Create a `.svg` file in `assets/icons/` using the icon's Figma layer name (kebab-case):
```
assets/icons/arrow-right.svg
assets/icons/wallet.svg
assets/icons/send-money.svg
```
Paste the raw SVG code from Figma into this file as-is. This preserves the source of truth.

### 8.3 — Convert SVG → React Native SVG component
Create a matching `.tsx` component in `src/components/ui/icons/` that converts the SVG markup to `react-native-svg` primitives:

**Conversion rules:**
| SVG element | react-native-svg import |
|---|---|
| `<svg>` | `<Svg>` |
| `<path>` | `<Path>` |
| `<rect>` | `<Rect>` |
| `<circle>` | `<Circle>` |
| `<ellipse>` | `<Ellipse>` |
| `<line>` | `<Line>` |
| `<polyline>` | `<Polyline>` |
| `<polygon>` | `<Polygon>` |
| `<g>` | `<G>` |
| `<defs>` | `<Defs>` |
| `<clipPath>` | `<ClipPath>` |
| `<linearGradient>` | `<LinearGradient>` |
| `<stop>` | `<Stop>` |
| `<mask>` | `<Mask>` |
| `<use>` | `<Use>` |

**Additional rules:**
- Replace `class=` with `className=` is NOT needed — use prop names directly (react-native-svg uses camelCase props)
- Convert `fill-rule` → `fillRule`, `clip-path` → `clipPath`, `stroke-width` → `strokeWidth`, etc. (all kebab attrs → camelCase)
- Remove any `xmlns` attributes from the root `<Svg>` — they are not needed
- Make `width`, `height`, `fill`, and `color` configurable via props with sensible defaults
- Support a `color` prop that overrides `fill` on all paths for single-color icons (use `currentColor` pattern)

**Component template:**
```tsx
import React from 'react';
import Svg, { Path, G } from 'react-native-svg';  // import only what's used

interface Props {
  size?: number;
  color?: string;
}

const ArrowRightIcon = ({ size = 24, color = '#000000' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12h14M12 5l7 7-7 7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default ArrowRightIcon;
```

### 8.4 — Usage in components
```tsx
import ArrowRightIcon from '@components/ui/icons/ArrowRightIcon';

// Inside JSX:
<ArrowRightIcon size={20} color="#6366F1" />
```

### 8.5 — Multi-color icons
If the icon has multiple hardcoded colors (not a single-color icon), keep each `fill` or `stroke` value as extracted from Figma rather than routing through a `color` prop.

---

## Step 9: Apply Production Design Quality (frontend-design principles)

When implementing from Figma, go beyond a mechanical pixel-copy. Apply the Anthropic `frontend-design` skill standards to ensure the output is distinctive and production-grade:

- **Avoid generic AI aesthetics** — no plain white cards with gray text, no default blue buttons, no cookie-cutter layouts. Honor the Figma design's personality.
- **Micro-interactions** — add subtle `Animated` or `react-native-reanimated` press feedback (scale, opacity) unless the Figma design explicitly specifies none.
- **Typography hierarchy** — enforce clear visual weight contrast between headings, subheadings, body, and captions. Don't flatten all text to the same style.
- **Spacing rhythm** — use consistent multiples of the 4pt base unit. Avoid one-off arbitrary values when a standard step fits.
- **Color intent** — use color purposefully: primary for CTAs, surface colors for containers, muted tones for secondary text. Don't scatter the same accent everywhere.
- **Empty & loading states** — if the component can be empty or loading, implement both states (skeleton or spinner) rather than leaving them blank.
- **Accessibility baseline** — add `accessibilityLabel` to `Pressable`/`TouchableOpacity` elements and ensure sufficient color contrast.

---

## Step 10: Apply React Native Best Practices

Apply the `react-native-best-practices` skill to ensure production-grade performance:

- **Animations** — use `react-native-reanimated` (not the legacy `Animated` API) so animations run on the UI thread at 60fps.
- **Lists** — use `FlashList` (`@shopify/flash-list`) instead of `FlatList` for scrollable lists; set `estimatedItemSize` correctly.
- **Re-renders** — wrap components in `React.memo` where appropriate. Never create inline objects/functions inside JSX (`style={{ ... }}` allocates a new object on every render — extract to a `const` outside the component or use `StyleSheet.create`).
- **Images** — set `resizeMode`; prefer `react-native-fast-image` for network images. (igonre this for now)
- **JS thread** — no heavy computation in the render cycle; offload with `useMemo` / `useCallback`.
- **Bundle** — import only what's needed; avoid barrel imports that pull in entire libraries.

For complex animations or gesture-heavy interactions, consult the full `react-native-best-practices` skill.

---

## Step 11: Visual Verification

After generating code, call `mcp__figma-desktop__get_screenshot` to display the original Figma design. Present it to the user so they can compare the implementation against the source design and request adjustments.

---

## Workflow Summary

```
1. get_design_context(nodeId)        → understand layout, styles, hierarchy
2. get_variable_defs(nodeId)         → map tokens to src/theme/ + detect light/dark
                                       variable modes (if applicable)
3. Dark mode pairing (Step 3.5)      → pair every bg/text/border with dark: variant
                                       using neutral scale convention; use isDark for
                                       style={} props, SVG colors, shadow colors
4. Responsive layout (Step 7)        → flex-based, rs() for scaling, breakpoint
                                       helpers, tablet maxWidth containers
5. SVG icons (Step 8)                → save to assets/icons/, convert to RN SVG
                                       component in src/components/ui/icons/
6. Write the component(s)            → NativeWind classes + dark: pairs, correct file
                                       placement, production design quality (Step 9)
7. Apply RN best practices (Step 10) → reanimated, FlashList, memo, no inline objects
8. get_screenshot(nodeId)            → show Figma reference for visual comparison
9. Note any discrepancies            → ask user if adjustments needed
```

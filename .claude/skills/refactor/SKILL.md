---
name: refactor
description:
  Use this skill when the user invokes /refactor manually and provides a screen or component file to refactor.Refactors React Native screens/components to use NativeWind 4 className-based styling instead of (or alongside) StyleSheet.create, following the project's design tokens.
---

# Refactor Skill — NativeWind Migration

The user has manually invoked `/refactor` and will provide a screen or component (file path or code).

## Step 0: Identify the target

The user will provide either:
- A file path (e.g. `src/features/dashboard/screens/HomeScreen.tsx`)
- A component name (find the file with Glob/Grep)
- Inline code pasted directly

If a path or name is given, **read the file first** before doing anything else.

---

## Step 1: Audit — Does it already use NativeWind?

Scan the file for these signals:

| Signal | Meaning |
|---|---|
| `className="..."` on any RN component | ✅ NativeWind already used |
| `import { styled } from 'nativewind'` | ✅ NativeWind already used |
| Only `StyleSheet.create({...})` + `style={styles.xxx}` | ❌ Not using NativeWind |
| Mix of both | ⚠️ Partial — complete the migration |

**If already fully using NativeWind:** report this to the user and stop. Do not over-engineer.

**If not using NativeWind (or partial):** proceed to Step 2.

---

## Step 2: Pre-refactor checklist

Before touching any code:

1. **Read `tailwind.config.js`** to know the full token set — spacing, colors, fontFamily, borderRadius, height, etc.
2. **Read the current file completely** to understand every style used.
3. **Map each `StyleSheet` entry** to a NativeWind equivalent (or note it must stay in `StyleSheet`).
4. **Never change visual appearance** — the refactored code must look identical.

---

## Step 3: Migration rules

### 3.1 — What moves to `className`

Move ALL of the following to NativeWind `className`:

| Property | Example `StyleSheet` | Example `className` |
|---|---|---|
| `backgroundColor` | `backgroundColor: '#2563EB'` | `bg-[#2563EB]` or `bg-info-600` |
| `color` (text) | `color: '#111827'` | `text-[#111827]` or `text-neutral-900` |
| `flexDirection` | `flexDirection: 'row'` | `flex-row` |
| `flex` | `flex: 1` | `flex-1` |
| `alignItems` | `alignItems: 'center'` | `items-center` |
| `justifyContent` | `justifyContent: 'space-between'` | `justify-between` |
| `padding` / `paddingHorizontal` / etc. | `paddingHorizontal: 24` | `px-xl` (if 24px token exists) or `px-[24px]` |
| `margin` variants | `marginTop: 16` | `mt-base` (if 16px token) or `mt-[16px]` |
| `gap` | `gap: 8` | `gap-sm` or `gap-[8px]` |
| `borderRadius` | `borderRadius: 12` | `rounded-md` or `rounded-[12px]` |
| `borderWidth` | `borderWidth: 1` | `border` |
| `borderColor` | `borderColor: '#E5E7EB'` | `border-[#E5E7EB]` |
| `width` / `height` (static) | `width: '100%'` | `w-full` |
| `overflow` | `overflow: 'hidden'` | `overflow-hidden` |
| `opacity` | `opacity: 0.7` | `opacity-[0.7]` |
| `fontSize` | `fontSize: 14` | `text-body` (if token) or `text-[14px]` |
| `fontFamily` | `fontFamily: 'Inter24pt-SemiBold'` | `font-inter-semibold` |
| `lineHeight` | `lineHeight: 21` | `leading-[21px]` |
| `letterSpacing` | `letterSpacing: 0.77` | `tracking-[0.77px]` |
| `textTransform` | `textTransform: 'uppercase'` | `uppercase` |
| `textAlign` | `textAlign: 'center'` | `text-center` |
| `position: 'absolute'` | — | `absolute` |
| `position: 'relative'` | — | `relative` |
| `top/left/right/bottom` | `top: 0` | `top-0` or `top-[8px]` |

### 3.2 — Prefer project tokens over arbitrary values

Always check `tailwind.config.js` tokens before using `[arbitrary]` values:

```
Spacing tokens: xxs(2) xs(4) sm(8) md(12) base(16) lg(20) xl(24) 2xl(32) 3xl(40) 4xl(48) 5xl(64) 6xl(80)
Border radius:  xs(4) sm(8) md(12) lg(16) xl(20) 2xl(24) full(9999)
Heights:        btn(52) btn-sm(40) header(56) tab-bar(80) input(52)
Font families:  font-jakarta-bold font-jakarta-semibold font-jakarta-medium
                font-inter-regular font-inter-medium font-inter-semibold font-inter-bold
                font-mono-regular font-mono-medium
Font sizes:     text-display text-h1 text-h2 text-h3 text-h4
                text-body-lg text-body text-small text-caption text-overline
                text-amount text-amount-lg text-amount-sm
Colors (brand): bg-primary-{50..950}  text-primary-{50..950}
Colors (neutral): bg-neutral-{0,25,50,100..950}
Colors (semantic): bg-success-{50..900} bg-error-{50..900} bg-warning-{50..900} bg-info-{50..900}
Opacity:        opacity-disabled(0.4) opacity-pressed(0.7) opacity-hover(0.8)
```

### 3.3 — What STAYS in `StyleSheet.create`

Keep in `StyleSheet` (do NOT move to className):

| Reason | Examples |
|---|---|
| **Shadows** — not supported by NativeWind on RN | `shadowColor`, `shadowOpacity`, `shadowRadius`, `shadowOffset`, `elevation` |
| **Dynamic / computed values** — depend on JS variables | `{ height: item.height * 80 }`, `{ backgroundColor: isDark ? '#000' : '#fff' }` |
| **`transform`** — complex transforms | `[{ rotate: '45deg' }]`, `[{ scale: 1.05 }]` |
| **Exact non-token pixel values on native-only props** | `borderBottomLeftRadius` + `borderBottomRightRadius` (asymmetric) |
| **`minWidth` / `minHeight`** for touch targets | `minWidth: 44, minHeight: 44` |
| **`maxWidth`** for layout caps | `maxWidth: 600` |

For dynamic styles that toggle between two states (e.g. selected/unselected), prefer `style` prop with a ternary:
```tsx
// ✅ Good — keep dynamic color in style prop
<View style={{ backgroundColor: isSelected ? '#2563EB' : '#E5E7EB' }} />

// ❌ Avoid — don't concatenate dynamic class strings
<View className={`${isSelected ? 'bg-info-600' : 'bg-neutral-200'}`} />
// ^ This is fine only if both values are static Tailwind classes (not arbitrary values)
```

### 3.4 — Dark mode pairing

When migrating static colors, add `dark:` variants following the project's convention:

| Role | Light | Dark |
|---|---|---|
| Screen bg | `bg-white` | `dark:bg-neutral-900` |
| Card/surface | `bg-neutral-50` | `dark:bg-neutral-800` |
| Primary text | `text-neutral-900` | `dark:text-neutral-50` |
| Secondary text | `text-neutral-500` | `dark:text-neutral-400` |
| Muted text | `text-neutral-400` | `dark:text-neutral-500` |
| Border | `border-neutral-200` | `dark:border-neutral-700` |

Brand / accent colors (e.g. `bg-info-600`, `bg-primary-500`) do NOT need a dark variant unless the Figma design specifies one.

### 3.5 — Active / pressed states

Replace manual `onPressIn`/`onPressOut` opacity handlers with the `active:opacity-pressed` class:
```tsx
// Before
<Pressable onPressIn={() => setOpacity(0.7)} onPressOut={() => setOpacity(1)} style={{ opacity }}>

// After
<Pressable className="active:opacity-pressed">
```

---

## Step 4: Refactoring procedure

1. **Remove** `StyleSheet.create` entries that were fully migrated to `className`.
2. **Keep** `StyleSheet.create` only for entries that must stay (shadows, dynamic values — see 3.3).
3. **Remove the `StyleSheet` import** if the `StyleSheet.create` object is now empty.
4. **Do NOT rename** variables, change component logic, props, or any behavior.
5. **Do NOT add or remove** any features — pure style migration only.
6. **Preserve all comments** that explain logic.
7. **Do NOT add** `allowFontScaling`, accessibility props, or any other non-style attributes unless they already exist.

---

## Step 5: Output format

After refactoring, output:

1. **The full refactored file** — complete, ready to paste/write.
2. **A short migration summary**:
   - How many `StyleSheet` entries were migrated → `className`
   - How many `StyleSheet` entries were kept and why
   - Any color mappings applied (e.g. `#111827` → `text-neutral-900`)
   - Any dark mode pairs added

---

## Step 6: Write the file

Use the `Edit` or `Write` tool to update the file in place. Do NOT ask the user to copy-paste the code — apply the changes directly.

---

## Quick reference: Common migration patterns

```tsx
// ─── LAYOUT ──────────────────────────────────────────────────────────────────
// Before: style={styles.row}  →  row: { flexDirection: 'row', alignItems: 'center', gap: 12 }
// After:  className="flex-row items-center gap-md"

// ─── CARD ────────────────────────────────────────────────────────────────────
// Before: style={styles.card}  →  card: { backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', padding: 16 }
// After:  className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-base"

// ─── HEADING ─────────────────────────────────────────────────────────────────
// Before: style={styles.title}  →  title: { fontFamily: 'PlusJakartaSans-Bold', fontSize: 16, color: '#111827' }
// After:  className="font-jakarta-bold text-h4 text-neutral-900 dark:text-neutral-50"

// ─── BADGE ───────────────────────────────────────────────────────────────────
// Before: style={styles.badge}  →  badge: { backgroundColor: '#EFF6FF', borderRadius: 20, paddingHorizontal: 10, height: 32 }
// After:  className="bg-info-50 rounded-full px-[10px] h-[32px] items-center justify-center"

// ─── SHADOW (stays in StyleSheet) ────────────────────────────────────────────
// shadowColor: '#2563EB', shadowOpacity: 0.32, shadowRadius: 40, shadowOffset: { width: 0, height: 16 }
// ↑ Keep as-is. No NativeWind equivalent on React Native.
```

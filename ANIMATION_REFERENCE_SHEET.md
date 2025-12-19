# 🎬 Complete Animation Reference Sheet

## Animation Classes Cheat Sheet

### 1. FADE ANIMATIONS

#### `.animate-fade-in`
- **Duration**: 0.5s
- **Easing**: ease-in
- **Effect**: Smooth opacity from 0 to 1
- **Use Case**: Page transitions, element visibility
```jsx
<div className="animate-fade-in">Content fades in</div>
```

#### `.animate-fade-out`
- **Duration**: 0.5s
- **Easing**: ease-out
- **Effect**: Smooth opacity from 1 to 0
- **Use Case**: Disappearing notifications, element removal
```jsx
<div className="animate-fade-out">Content fades out</div>
```

---

### 2. SLIDE ANIMATIONS

#### `.animate-slide-in-up`
- **Duration**: 0.6s
- **Easing**: cubic-bezier(0.34, 1.56, 0.64, 1) [bounce]
- **Effect**: Slide from bottom + fade in
- **Use Case**: Hero sections, modal entrances, content reveals
```jsx
<div className="animate-slide-in-up">Slides up from bottom</div>
```

#### `.animate-slide-in-down`
- **Duration**: 0.6s
- **Easing**: cubic-bezier(0.34, 1.56, 0.64, 1) [bounce]
- **Effect**: Slide from top + fade in
- **Use Case**: Dropdown menus, notifications, top bars
```jsx
<div className="animate-slide-in-down">Slides down from top</div>
```

#### `.animate-slide-in-left`
- **Duration**: 0.6s
- **Easing**: cubic-bezier(0.34, 1.56, 0.64, 1) [bounce]
- **Effect**: Slide from right + fade in
- **Use Case**: Side panels, navigation drawers
```jsx
<div className="animate-slide-in-left">Slides in from right</div>
```

#### `.animate-slide-in-right`
- **Duration**: 0.6s
- **Easing**: cubic-bezier(0.34, 1.56, 0.64, 1) [bounce]
- **Effect**: Slide from left + fade in
- **Use Case**: Alternate slide effects
```jsx
<div className="animate-slide-in-right">Slides in from left</div>
```

---

### 3. SCALE ANIMATIONS

#### `.animate-scale-in`
- **Duration**: 0.4s
- **Easing**: cubic-bezier(0.34, 1.56, 0.64, 1) [bounce]
- **Effect**: Scale from 0% to 100%
- **Use Case**: Card reveals, element emphasis
```jsx
<div className="animate-scale-in">Scales in from center</div>
```

#### `.animate-hover-scale`
- **Duration**: 0.3s
- **Easing**: cubic-bezier(0.34, 1.56, 0.64, 1) [bounce]
- **Trigger**: Hover state
- **Effect**: Scale to 1.05x on hover
- **Use Case**: Interactive elements, buttons
```jsx
<div className="animate-hover-scale hover:scale-110">Scales on hover</div>
```

---

### 4. BOUNCE ANIMATIONS

#### `.animate-bounce-gentle`
- **Duration**: 2s
- **Iteration**: Infinite
- **Effect**: Gentle up-down bounce
- **Use Case**: Loading indicators, floating elements
```jsx
<div className="animate-bounce-gentle">Gently bounces</div>
```

**Manual Alternative** (smaller bounce):
```jsx
<div className="animate-bounce">Default Tailwind bounce</div>
```

---

### 5. GLOW ANIMATIONS

#### `.animate-glow`
- **Duration**: 2s
- **Iteration**: Infinite
- **Easing**: ease-in-out
- **Effect**: Pulsing glow/shadow effect
- **Use Case**: Highlighting important elements, focus states
```jsx
<div className="animate-glow">Glows with radiance</div>
```

---

### 6. PULSE ANIMATIONS

#### `.animate-pulse-subtle`
- **Duration**: Infinite
- **Effect**: Subtle opacity pulsing (0.5 to 1)
- **Use Case**: Background elements, ambient effects
```jsx
<div className="animate-pulse-subtle">Subtle pulse</div>
```

**Standard Tailwind Alternative**:
```jsx
<div className="animate-pulse">Standard pulse effect</div>
```

---

### 7. SHIMMER ANIMATIONS

#### `.animate-shimmer`
- **Duration**: 2s
- **Iteration**: Infinite
- **Effect**: Left-to-right shine effect
- **Use Case**: Loading placeholders, skeleton screens
```jsx
<div className="animate-shimmer">Shimmering effect</div>
```

---

### 8. GRADIENT ANIMATIONS

#### `.animate-gradient`
- **Duration**: 3s
- **Iteration**: Infinite
- **Effect**: Animated gradient background
- **Use Case**: Dynamic backgrounds, visual interest
```jsx
<div className="animate-gradient bg-gradient-primary">Gradient animates</div>
```

---

## Transition Classes

### `.transition-smooth`
- **Duration**: 300ms
- **Easing**: ease-in-out
- **Use**: Most interactive element transitions
```jsx
<button className="transition-smooth hover:bg-primary">
  Smooth transition
</button>
```

### `.transition-fast`
- **Duration**: 150ms
- **Easing**: ease-in-out
- **Use**: Quick feedback, form interactions
```jsx
<input className="transition-fast focus:border-primary" />
```

### `.transition-slow`
- **Duration**: 500ms
- **Easing**: ease-in-out
- **Use**: Page transitions, major layout changes
```jsx
<div className="transition-slow">Slow transition</div>
```

---

## Staggered Animation Classes

### `.stagger-animation`
- **Base Animation**: slideInUp with opacity 0
- **Duration**: 0.6s cubic-bezier
- **Use**: Apply to list items with incrementing delays

```jsx
{items.map((item, idx) => (
  <div 
    key={idx}
    className="stagger-animation"
    style={{ animationDelay: `${idx * 100}ms` }}
  >
    {item}
  </div>
))}
```

### Predefined Stagger Delays
```jsx
<div className="stagger-1">Delay: 100ms</div>
<div className="stagger-2">Delay: 200ms</div>
<div className="stagger-3">Delay: 300ms</div>
<div className="stagger-4">Delay: 400ms</div>
<div className="stagger-5">Delay: 500ms</div>
```

---

## Component Helper Classes

### Gradient Classes

#### `.bg-gradient-primary`
```css
background: linear-gradient(90deg, #4a3a52 -> #6b5b72 -> #4a3a52)
```
```jsx
<div className="bg-gradient-primary text-white p-8">
  Purple gradient background
</div>
```

#### `.bg-gradient-accent`
```css
background: linear-gradient(90deg, #74ff00 -> #74ff00/80)
```
```jsx
<button className="bg-gradient-accent text-foreground">
  Lime green gradient button
</button>
```

#### `.bg-gradient-soft`
```css
background: linear-gradient(180deg, background -> muted/20)
```
```jsx
<section className="bg-gradient-soft">
  Soft subtle gradient background
</section>
```

### Card Classes

#### `.card-elevated`
- Shadow: md (default) to lg (hover)
- Border: border-border with primary on hover
- Transition: All properties smooth
```jsx
<div className="card-elevated p-8">
  Elevated card with hover shadow
</div>
```

#### `.card-interactive`
- Extends: `.card-elevated`
- Additional: Hover scale 1.05 + active scale 0.95
- Cursor: pointer
```jsx
<div className="card-interactive cursor-pointer">
  Clickable interactive card
</div>
```

### Text Classes

#### `.text-gradient`
- Background: linear-gradient(primary -> secondary)
- Effect: bg-clip-text + transparent color
```jsx
<h1 className="text-gradient font-black">
  Gradient text heading
</h1>
```

#### `.text-glow`
- Color: Primary color
- Effect: drop-shadow-lg
```jsx
<h2 className="text-glow">
  Glowing text effect
</h2>
```

### Button Classes

#### `.btn-smooth`
- Transition: All properties smooth (300ms)
- Active: Scale 95% (press effect)
```jsx
<button className="btn-smooth">
  Smooth button transitions
</button>
```

---

## Combining Animations

### Example 1: Full Button Effect
```jsx
<Button className="
  bg-gradient-to-r from-accent to-accent/80
  text-foreground 
  font-bold
  
  hover:scale-110 
  hover:shadow-xl 
  hover:from-accent hover:to-accent
  
  active:scale-95
  
  transition-all duration-300
  
  gap-2
">
  🚀 Click Me
</Button>
```

### Example 2: Card with Stagger
```jsx
<div className="grid grid-cols-3 gap-8">
  {cards.map((card, idx) => (
    <Card 
      key={idx}
      className="card-interactive stagger-animation"
      style={{ animationDelay: `${idx * 100}ms` }}
    >
      <CardContent className="p-8 space-y-4">
        <div className="bg-gradient-primary p-4 rounded-lg">
          {card.icon}
        </div>
        <h3 className="text-xl font-bold">{card.title}</h3>
        <p className="text-muted-foreground">{card.desc}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

### Example 3: Animated Link
```jsx
<a className="
  text-primary 
  hover:text-secondary 
  transition-colors 
  relative 
  group
  inline-block
">
  Hover Me
  <span className="
    absolute 
    bottom-0 left-0 
    w-0 h-1 
    bg-gradient-to-r from-accent to-transparent
    group-hover:w-full 
    transition-all 
    duration-300 
    rounded-full
  " />
</a>
```

---

## Animation Timing Guide

| Duration | Class | Use Case |
|----------|-------|----------|
| 150ms | `.transition-fast` | Form inputs, quick feedback |
| 300ms | `.transition-smooth` | Most hover effects, interactions |
| 400ms | `.animate-scale-in` | Card reveals, emphasis |
| 500ms | `.transition-slow` | Page transitions |
| 600ms | `.animate-slide-in-*` | Hero sections, modals |
| 2000ms | `.animate-bounce-gentle`, `.animate-glow` | Loading, infinite effects |

---

## Easing Functions Used

### ease-in
```
cubic-bezier(0.42, 0, 1, 1)
For: Departing animations
Feel: Accelerating
```

### ease-out
```
cubic-bezier(0, 0, 0.58, 1)
For: Arriving animations
Feel: Decelerating
```

### ease-in-out
```
cubic-bezier(0.42, 0, 0.58, 1)
For: Smooth transitions
Feel: Natural, balanced
```

### cubic-bezier(0.34, 1.56, 0.64, 1) [Bounce]
```
Custom elastic easing
For: Entrance animations
Feel: Playful, bouncy, dynamic
```

---

## Browser Support

| Browser | Support | Min Version |
|---------|---------|-------------|
| Chrome | ✅ Full | 90+ |
| Firefox | ✅ Full | 88+ |
| Safari | ✅ Full | 14+ |
| Edge | ✅ Full | 90+ |
| Opera | ✅ Full | 76+ |
| Mobile Chrome | ✅ Full | Latest |
| Mobile Safari | ✅ Full | 14+ |

---

## Performance Tips

### DO ✅
- Use `transform` for animations (scale, translate, rotate)
- Use `opacity` for visibility changes
- Keep animations under 600ms
- Use `will-change: transform;` for heavy animations
- Test on low-end devices

### DON'T ❌
- Animate `width`, `height`, `left`, `top`
- Use `background-color` animations (use overlays instead)
- Create too many simultaneous animations
- Use `position` changes (use `transform` instead)
- Ignore mobile performance

---

## Debugging Animations

### Check FPS in Chrome DevTools
1. Open DevTools (F12)
2. Cmd/Ctrl + Shift + P
3. Type "Rendering"
4. Check FPS meter
5. Target: 60 FPS (16.67ms per frame)

### Check Animation in DevTools
1. Open DevTools (F12)
2. Select the element
3. Look at "Animations" panel
4. Verify timing and easing

### Common Issues
- **Stuttering**: Check for non-transform animations
- **Jank**: Reduce simultaneous animations
- **Not playing**: Check element display/visibility
- **Wrong easing**: Compare with expected curve

---

## Quick Copy-Paste Template

```jsx
// 1. Gradient header
<h1 className="text-gradient font-black text-5xl">
  Your Title
</h1>

// 2. Animated button
<Button className="bg-gradient-to-r from-accent to-accent/80 
  hover:scale-110 active:scale-95 transition-all">
  Click Me
</Button>

// 3. Feature cards with stagger
<div className="grid grid-cols-3 gap-8">
  {features.map((f, i) => (
    <Card className="card-interactive stagger-animation"
      style={{animationDelay: `${i * 100}ms`}}>
      <CardContent className="p-8">
        <div className="bg-gradient-primary p-4 rounded-lg">
          {f.icon}
        </div>
        <h3 className="text-xl font-bold">{f.title}</h3>
        <p className="text-muted-foreground">{f.desc}</p>
      </CardContent>
    </Card>
  ))}
</div>

// 4. Smooth transition
<div className="transition-smooth hover:bg-primary">
  Hover for smooth transition
</div>
```

---

**Last Updated**: 2024
**Animation System**: Version 2.0
**Total Animations**: 12+ custom + Tailwind defaults
**Status**: Production Ready ✅

Use this as your quick reference guide for all animations! 🎬

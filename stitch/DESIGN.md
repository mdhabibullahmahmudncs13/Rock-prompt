# Design System Strategy: Prompt Optimizer by Xenon

## 1. Overview & Creative North Star: "The Neon Monolith"
This design system moves beyond the "standard SaaS dashboard" to create a high-fidelity, editorial environment for prompt engineering. Our Creative North Star is **The Neon Monolith**. 

We treat the interface not as a collection of boxes, but as a singular, deep-space environment where logic meets electricity. We achieve a "custom" feel by leaning into high-contrast typography scales, intentional asymmetry in layouts, and a "Tonal Depth" philosophy that replaces traditional lines with light and shadow. The goal is to make the user feel like they are operating a sophisticated piece of specialized laboratory equipment, rather than a generic web app.

---

## 2. Colors & Surface Philosophy
The palette is rooted in an ultra-dark foundation, using the electric violet-blue accent as a functional "light source" that guides the user’s eye.

### Tonal Hierarchy
*   **Background (`#131315`):** The infinite void. Used for the primary application canvas.
*   **Surface Tiers:** 
    *   `surface_container_lowest`: Deep recesses, background utility areas.
    *   `surface_container_low`: Standard resting state for large layout blocks.
    *   `surface_container_high`: Interactive elements, hover states.
    *   `surface_container_highest`: Active modals or elevated pop-overs.

### The "No-Line" Rule
To maintain a premium, editorial feel, **1px solid borders are prohibited for sectioning.** 
Structural separation must be achieved through:
1.  **Background Shifts:** Placing a `surface_container_low` card atop the `surface` background.
2.  **Negative Space:** Using the spacing scale to create clear mental groupings.
3.  **Tonal Transitions:** Subtle shifts in container brightness to denote hierarchy.

### Signature Accents
*   **Primary (`#7C6FF7`):** Use for mission-critical CTAs and active states. 
*   **The Violet Glow:** Instead of flat fills, use the `primary` token with low-opacity glows (blur: 24px+) to simulate "light leakage" from the prompt engine.

---

## 3. Typography: The Editorial Edge
We utilize **Inter** not as a utility font, but as a branding tool through extreme scale and weight.

*   **Display (Large Scale):** Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero headlines. This creates an "authoritative" presence.
*   **Monospace Utility:** For all prompt input areas and code blocks, use a high-quality Monospace font (e.g., Geist Mono) at `body-md` scale to differentiate "Machine Input" from "Human Interface."
*   **Label Hierarchy:** Labels (`label-sm`) should always be in `on_surface_variant` (low contrast) and Uppercase with +0.05em tracking to create a sophisticated, "instrument-panel" aesthetic.

---

## 4. Elevation & Depth: Tonal Layering
Traditional box-shadows are too "web-standard." We use **Layering Principles** to convey height.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface_container_highest` element should feel like it is physically closer to the user’s eye because it is lighter in tone, not just because it has a shadow.
*   **Ambient Shadows:** For floating menus, use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);`. The shadow color is never pure black, but a tinted version of the background.
*   **The "Ghost Border" Fallback:** If a container requires a border for accessibility, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism:** For the side navigation or top-level headers, use a `backdrop-blur: 12px` with a semi-transparent `surface` color to allow content to bleed through, softening the interface.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (`#7C6FF7`) with `on_primary` text. No gradients. 
*   **Secondary:** Ghost style. Transparent background with a `Ghost Border` and `primary` text.
*   **Shape:** `DEFAULT` (0.5rem) for a modern, architectural feel. Avoid full pill shapes except for status badges.

### Input Fields & Textareas
*   **The Prompt Engine:** Textareas use `surface_container_low`. When focused, they do not get a border; they receive a 2px `primary` outer glow and the background shifts to `surface_container_high`.
*   **Monospace:** All prompt text must be monospace to emphasize the technical nature of "Prompt Optimization."

### Chips & Badges
*   **Status Badges:** Use the `full` (9999px) roundedness scale. 
*   **Visual Style:** Subtle `secondary_container` background with high-contrast text.

### List Items
*   **No Dividers:** Lists are never separated by lines. Use 8px of vertical spacing between items and a `surface_container_high` background on hover to define the "hit area."

### Custom Component: The "Optimization Trace"
*   A vertical progress line using a `primary` to `transparent` gradient to show the flow of data through the AI model.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Align the primary action button to the far right, leaving large areas of the left side for "Negative Space."
*   **Use Tonal Shifts:** If an element needs to stand out, make its background one step higher in the `surface_container` scale.
*   **Respect the Type Scale:** Use `display-md` for empty states to make them feel like intentional design moments.

### Don't:
*   **Don't use 100% white text:** Always use `on_surface` or `on_surface_variant` to prevent eye strain in dark mode.
*   **Don't use "Drop Shadows":** Use tonal layering or ambient, high-blur shadows only.
*   **Don't use Divider Lines:** If you feel the need for a line, increase the padding or change the background color of the section instead.
*   **No Noise/Texture:** Keep the surfaces perfectly flat and clean to maintain the "Xenon" brand's high-tech precision.
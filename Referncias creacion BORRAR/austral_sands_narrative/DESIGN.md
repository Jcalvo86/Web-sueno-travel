---
name: Austral Sands Narrative
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#44474c'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#75777d'
  outline-variant: '#c5c6cc'
  surface-tint: '#535f70'
  primary: '#091524'
  on-primary: '#ffffff'
  primary-container: '#1e2a39'
  on-primary-container: '#8591a4'
  inverse-primary: '#bbc7db'
  secondary: '#7f5621'
  on-secondary: '#ffffff'
  secondary-container: '#ffc788'
  on-secondary-container: '#7a511c'
  tertiary: '#17150f'
  on-tertiary: '#ffffff'
  tertiary-container: '#2c2923'
  on-tertiary-container: '#959087'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3f8'
  primary-fixed-dim: '#bbc7db'
  on-primary-fixed: '#101c2b'
  on-primary-fixed-variant: '#3c4858'
  secondary-fixed: '#ffddb9'
  secondary-fixed-dim: '#f3bc7d'
  on-secondary-fixed: '#2b1700'
  on-secondary-fixed-variant: '#643f0a'
  tertiary-fixed: '#e8e2d8'
  tertiary-fixed-dim: '#ccc6bc'
  on-tertiary-fixed: '#1e1b15'
  on-tertiary-fixed-variant: '#4a463f'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  container-max: 1280px
---

## Brand & Style

This design system is built for a premium travel experience that bridges the gap between rugged adventure and high-end comfort. The brand personality is **Adventurous, Cultured, and Trustworthy**, catering to travelers seeking bespoke experiences in historic and desert landscapes.

The visual style is **Corporate Modern with a Tactile twist**. It utilizes clean, balanced layouts to establish professional authority while incorporating soft, desert-inspired gradients and glassmorphic overlays to evoke the "Sueño" (dream) aspect of travel. The interface prioritizes high-quality photography, using imagery as a primary structural element rather than a secondary decoration. 

Design pillars include:
- **Clarity over Clutter:** Generous whitespace to allow destination photography to breathe.
- **Natural Sophistication:** A palette derived from earth, sky, and stone.
- **Reliable Precision:** Sharp functional elements paired with soft-edged containers.

## Colors

The palette is anchored in the contrast between deep oceanic blues and sun-drenched desert tones, reflecting the journey from Chile to global historic sites.

- **Primary (Deep Blue):** #1E2A39. Used for navigation, primary headings, and high-priority call-to-actions. It provides the "trust" foundation.
- **Secondary (Ochre Gold):** #C59358. Used for accentuation, iconography highlights, and active states. This color evokes desert sands and ancient monuments.
- **Tertiary (Cream):** #EAE3D9. The primary background color for cards and secondary surfaces, offering a softer, more organic feel than pure white.
- **Accent (Muted Teal):** Derived from the "Submit" button in the reference image, used for secondary action buttons to provide visual variety without clashing with the gold.

The system defaults to **Light Mode** to maintain an airy, editorial feel, but uses deep blue containers to create high-contrast "moments" in the user journey.

## Typography

The typography strategy balances modern efficiency with a welcoming, rounded geometric feel.

- **Headlines:** Uses **Manrope**. Its geometric construction feels modern and technical, yet its wide apertures keep it approachable. Bold weights should be used for destination titles to convey strength.
- **Body:** Uses **Plus Jakarta Sans**. Chosen for its excellent legibility and slightly softer personality, making long itineraries or descriptions comfortable to read.
- **Labels:** Uses **Manrope** in semi-bold or bold, often with slight letter spacing and uppercase styling for form headers and button text to maintain a professional, organized structure.

Large display type should be used sparingly, primarily for hero sections where it can overlay high-contrast imagery.

## Layout & Spacing

The design system employs a **Fluid Grid** model with strict horizontal constraints to ensure an editorial feel on wide displays.

- **Grid:** A 12-column system for desktop, 6-column for tablet, and 2-column for mobile. 
- **Rhythm:** An 8px linear scale governs all padding and margins. 
- **Responsive Behavior:** On desktop, content is contained within a 1280px max-width to prevent line lengths from becoming unreadable. On mobile, margins shrink to 20px, and vertical spacing between cards increases to ensure tap targets are clear.
- **Visual Weight:** Important content sections (like the contact form or destination selection) should use generous internal padding (40px+) to create a "premium space" feel.

## Elevation & Depth

This design system uses **Tonal Layering** and **Soft Glassmorphism** to create hierarchy without feeling heavy.

1.  **Base Layer:** The Tertiary Cream (#EAE3D9) or photography.
2.  **Surface Layer:** White containers with a 5% opacity Primary Blue tint.
3.  **Elevation:** Instead of heavy drop shadows, use "Ambient Glows"—very soft, large-radius shadows (20px-40px blur) with low opacity (5-10%) to make cards appear as if they are floating just above the surface.
4.  **Glassmorphism:** Navigation bars and hero-contact forms should utilize a `backdrop-filter: blur(12px)` with a semi-transparent white or cream fill (opacity 0.8) to maintain context of the background imagery while ensuring text legibility.

## Shapes

The shape language is **Rounded**, reflecting the softness of sand dunes and the "dreamy" nature of the brand name.

- **Standard Radius:** 0.5rem (8px) for buttons and input fields.
- **Container Radius:** 1rem (16px) for cards and main UI blocks.
- **Large Radius:** 1.5rem (24px) for prominent feature sections or modal containers.
- **Iconography:** Use "Squircle" or heavily rounded background containers for destination icons (as seen in the Egypt/Jordan/Greece/Turkey icons) to maintain a friendly, approachable aesthetic.

## Components

### Buttons
- **Primary:** Deep Blue (#1E2A39) background, white text. Bold weight.
- **Secondary:** Ochre Gold (#C59358) border or background for specific "Book Now" actions.
- **Ghost:** Transparent background with Primary Blue border for less critical actions.

### Input Fields
Inputs should use a soft Tertiary Cream or very light grey background (#F2F2F2) with a subtle 1px border. Focus states should transition the border to Ochre Gold. Labels must always be visible above the field in Manrope Semi-bold.

### Chips & Destination Selectors
Use the "Icon + Label" stack within a rounded-lg container. Active states are indicated by a subtle shadow and a Primary Blue border or background shift.

### Cards
Cards for travel packages should feature a full-bleed top image, a 16px padding content area below, and use the "Ambient Glow" elevation style.

### Lists
Itinerary lists should use the Ochre Gold for bullet points or icons to lead the eye through the timeline of the trip.
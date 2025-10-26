# Service Management Application - Design Guidelines

## Design Approach

**System Foundation: Material Design with Productivity App Influences**
This utility-focused application prioritizes efficiency, clarity, and data accessibility for technicians in the field. Drawing from Material Design principles with inspiration from Linear's typography and Notion's data organization, the design ensures quick information scanning and streamlined task completion.

**Core Design Principles:**
1. Information hierarchy over decoration
2. One-click access to critical actions
3. Scannable data tables and lists
4. Clear status indicators and progress tracking
5. Minimal cognitive load for mobile use

---

## Typography System

**Font Family:**
- Primary: Inter or Roboto via Google Fonts CDN
- Monospace: JetBrains Mono for serial numbers, IDs, and technical data

**Type Scale:**
- Page Headers: text-3xl font-bold (32px)
- Section Headers: text-xl font-semibold (20px)
- Card Titles: text-lg font-medium (18px)
- Body Text: text-base font-normal (16px)
- Labels/Metadata: text-sm font-medium (14px)
- Captions/Timestamps: text-xs (12px)

**Hierarchy Rules:**
- Page titles always left-aligned with username display at text-sm in top-right
- Section headers use subtle bottom borders (border-b) for visual separation
- Data labels use uppercase text-xs tracking-wide for distinction from values
- Form labels use text-sm font-medium positioned above inputs

---

## Layout System

**Spacing Primitives:**
Primary units: 2, 4, 6, 8, 12, 16, 24 (e.g., p-4, gap-6, mb-8)

**Container Strategy:**
- App shell: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Content sections: py-6 on mobile, py-8 on desktop
- Cards/panels: p-6 for content padding
- Form sections: space-y-6 between field groups

**Grid Patterns:**
- Task lists: Single column on mobile, 2-column grid md:grid-cols-2 on tablet+
- Client cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 with gap-6
- Appliance history: Single column timeline layout with connecting lines
- Storage tabs: Equal-width tab buttons, full-width content below

**Vertical Rhythm:**
- Consistent 6-unit spacing between major sections
- 4-unit spacing within component groups
- 2-unit spacing for tightly related elements (label to input)

---

## Component Library

### Navigation & Shell
**Top Navigation Bar:**
- Fixed header: h-16 with shadow-sm, flex items-center justify-between
- Left: App logo/name (text-xl font-bold)
- Right: Username (text-sm) + Logout button (text-sm underline)
- Mobile: Stack username above logout, both right-aligned

**Bottom Navigation (Mobile Only):**
- Fixed bottom bar: h-16 with border-t shadow-lg-top
- Three equal-width buttons: Tasks, Clients, Storage
- Icons from Heroicons (outline style) above labels
- Active state: font-semibold with icon filled variant

**Back Buttons:**
- Consistent placement: top-left of content area
- Icon + text: "← Back to [Previous Page]"
- Clickable area: p-2 for touch-friendly targets

### Data Display

**Task Cards:**
- White background with border, rounded-lg, p-5
- Header row: Task description (text-lg font-medium) + Status badge
- Metadata row: Client name (text-sm) • Created date (text-xs text-gray-500)
- Hover: subtle shadow-md elevation
- Status badges: px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide

**Client List Cards:**
- Grid layout with consistent aspect ratio
- Header: Client name (text-lg font-bold)
- Contact row: Email icon + email, Phone icon + number (text-sm)
- Footer: "X appliances" count (text-sm font-medium)
- Clickable entire card with hover:shadow-lg

**Data Tables (Appliance History, Reports):**
- Desktop: Traditional table with headers (text-xs uppercase tracking-wide font-semibold)
- Mobile: Stacked cards with label:value pairs
- Row spacing: py-4 with border-b between rows
- Alternating subtle background on desktop for scannability

**Detail Views:**
- Two-column layout on desktop: 60/40 split (main info / metadata)
- Mobile: Single column, metadata section with border-t mt-6 pt-6
- Info groups: mb-6 spacing, each with heading (text-sm uppercase tracking-wide mb-3)
- Key-value pairs: grid grid-cols-3 gap-4 (label spans 1, value spans 2)

### Forms

**Input Fields:**
- Full width with mb-4 spacing
- Label above: text-sm font-medium mb-1.5
- Input: h-11 px-4 border rounded-lg, focus ring-2 offset-0
- Helper text below: text-xs mt-1
- Required indicator: Asterisk in label (text-red-500)

**Textareas:**
- min-h-32 for descriptions
- resize-vertical only
- Same border/focus treatment as inputs

**File Upload:**
- Dashed border zone: border-2 border-dashed rounded-lg p-8 text-center
- Upload icon (Heroicons arrow-up-tray) centered, size-12
- Instruction text: "Click to upload or drag and drop"
- File type hint: text-xs below
- Preview grid: grid-cols-2 md:grid-cols-4 gap-4 mt-4 for uploaded images

**Dropdown/Select:**
- Match input height (h-11) with chevron-down icon right-aligned
- Search-enabled for spare parts: combo-box pattern with filtering
- Quantity input next to selected item: w-20 inline number input

**Action Buttons:**
- Primary: px-6 py-2.5 rounded-lg font-medium text-base
- Secondary: border variant with px-6 py-2.5
- Icon buttons: p-2 square touch target (min 44x44px)
- Submit buttons: w-full on mobile, w-auto on desktop
- Loading state: disabled opacity-50 with spinner icon

### Storage Section

**Tab Navigation:**
- Three equal tabs: border-b-2 on active tab
- Tab buttons: px-6 py-3 font-medium
- Content area: mt-6 min-h-96

**Spare Parts Grid:**
- Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
- Each card: Image (aspect-square) + Name + Maker + Quantity badge
- Low stock indicator: Quantity badge turns red when < 5

**Documents List:**
- List items with document icon + name + upload date
- Download button on right
- Upload button: Prominent at top-right of section

**History Timeline:**
- Vertical timeline with connecting line (border-l-2 on container)
- Each entry: Circle marker + Date header + Report summary card
- Expandable: Click to show full report details

### Status & Feedback

**Status Badges:**
- Pending: Light background, medium weight text
- In Progress: Medium saturation background
- Completed: Success treatment, checkmark icon
- All: rounded-full px-3 py-1 text-xs font-semibold

**Loading States:**
- Skeleton screens: animate-pulse gray backgrounds matching content shape
- Spinner: size-6 centered for small components, size-12 for full-page
- Progress bar: h-1 fixed top for page transitions

**Toast Notifications:**
- Fixed top-right: top-4 right-4
- Width: max-w-sm
- Icons: Success (check-circle), Error (x-circle), Info (information-circle)
- Auto-dismiss: 4 seconds with slide-out animation

---

## Page-Specific Layouts

### Sign In Page
- Centered card: max-w-md mx-auto mt-24
- Logo/title centered above card
- Form: space-y-4 within p-8 card
- Submit button: Full width, prominent

### Main Dashboard
- Three large navigation cards in grid
- Each card: h-48 with icon (size-16), title (text-2xl), description (text-sm)
- Hover: scale-105 transform with shadow-xl

### Task Details Page
- Top section: Client + Appliance info in two-column grid
- Middle: Task metadata (status, dates) in labeled grid
- Bottom: "Make Report" button prominent, full-width on mobile

### Report Creation
- Single-column form, max-w-3xl
- Photo upload section visually prominent (larger drop zone)
- Spare parts: Repeatable row pattern with + Add Another button
- Submit: Sticky footer on mobile with shadow-lg-top

### Appliance Details
- Hero: Appliance photo full-width, max-h-96 object-cover
- Info grid below hero
- Service history: Chronological list with most recent first
- Print button: Fixed bottom-right fab (floating action button) on desktop

---

## Mobile Optimizations

**Touch Targets:**
- Minimum 44x44px (h-11 w-11) for all interactive elements
- Increased padding on buttons (py-3 instead of py-2)

**Navigation:**
- Hamburger menu NOT used - bottom navigation provides persistent access
- Swipe gestures: Swipe right to go back (where appropriate)

**Lists:**
- Generous spacing: py-5 per item
- Full-width clickable areas
- Swipe actions: Optional delete/archive on task cards

**Forms:**
- Large inputs: h-12 on mobile
- Native date/time pickers
- Camera integration for photo uploads

---

## Images

**Required Images:**
1. **Appliance Photos**: Square aspect ratio (1:1), display at full card width in details view, thumbnail in lists
2. **Report Photos**: Multiple images in 2-column grid (mobile) / 4-column grid (desktop), lightbox on click
3. **Spare Part Photos**: Small thumbnails (80x80) in lists, larger (200x200) in detail modals
4. **Placeholder Images**: Gray background with icon (wrench for appliances, box for parts, document for files)

**No Hero Images**: This is a utility application, not a marketing site. Login page uses simple centered form, dashboard uses icon cards.

---

## Accessibility & Quality

- All form inputs have associated labels (not just placeholders)
- Focus indicators: ring-2 with offset-0 for all interactive elements
- Error messages: role="alert" with icon + text, positioned near field
- Success messages: Announced to screen readers
- Keyboard navigation: Tab order follows visual hierarchy, Enter submits forms
- Alt text: Descriptive for appliance/spare part images, empty for decorative icons

This design system creates a professional, efficient tool that technicians can use confidently in the field, with clear information hierarchy and streamlined workflows.
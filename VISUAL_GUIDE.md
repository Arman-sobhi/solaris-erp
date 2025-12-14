# 🎨 Visual Component Guide

Quick visual reference for building consistent UI across the ERP system.

## 🎯 Page Layouts

### Standard List Page Layout
```
┌─────────────────────────────────────────────────────────┐
│  PAGE HEADER                                            │
│  Title + Description                    [Action Buttons]│
├─────────────────────────────────────────────────────────┤
│  FILTERS & SEARCH                                       │
│  [Search Input]  [Category ▼]  [Status ▼]  [Filter]   │
├─────────────────────────────────────────────────────────┤
│  STATS CARDS (4 columns)                                │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │Total │  │Active│  │Value │  │Alert │              │
│  │ 100  │  │  85  │  │$12K  │  │  5   │              │
│  └──────┘  └──────┘  └──────┘  └──────┘              │
├─────────────────────────────────────────────────────────┤
│  DATA TABLE                                             │
│  Col1    Col2      Col3      Status    [Actions ⋮]     │
│  ────────────────────────────────────────────────      │
│  Data    Data      Data      [Active]  [View Edit]     │
│  Data    Data      Data      [Pending] [View Edit]     │
│  Data    Data      Data      [Done]    [View Edit]     │
└─────────────────────────────────────────────────────────┘
```

### Standard Detail Page Layout
```
┌─────────────────────────────────────────────────────────┐
│  [← Back]  TITLE                        [Edit] [Delete] │
│  Subtitle / Metadata                                     │
├─────────────────────────────────────────────────────────┤
│  OVERVIEW CARDS (4 columns)                             │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │Icon  │  │Icon  │  │Icon  │  │Icon  │              │
│  │Value │  │Value │  │Value │  │Value │              │
│  └──────┘  └──────┘  └──────┘  └──────┘              │
├─────────────────────────────────────────────────────────┤
│  TABS                                                    │
│  [Overview] [Details] [History] [Related] [Settings]    │
├─────────────────────────────────────────────────────────┤
│  TAB CONTENT                                            │
│  ┌───────────────────────────────────────────────────┐ │
│  │                                                   │ │
│  │  Content specific to selected tab                │ │
│  │  (Tables, Forms, Cards, etc.)                    │ │
│  │                                                   │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Editor Page Layout
```
┌─────────────────────────────────────────────────────────┐
│  [← Back]  EDITOR TITLE                 [Cancel] [Save] │
├─────────────────────────────────────────────────────────┤
│  FORM SECTION 1                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Label 1     [Input Field            ]            │ │
│  │ Label 2     [Dropdown ▼             ]            │ │
│  │ Label 3     [Input Field            ]            │ │
│  └───────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  EDITABLE TABLE                          [+ Add Row]    │
│  ┌───────────────────────────────────────────────────┐ │
│  │ [Input]  [Input]  [Select▼]  [Input]  [Delete] │ │
│  │ [Input]  [Input]  [Select▼]  [Input]  [Delete] │ │
│  │ [Input]  [Input]  [Select▼]  [Input]  [Delete] │ │
│  └───────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  SUMMARY                                                │
│  Total: $1,234.56                    3 items            │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Component Patterns

### KPI Card
```
┌─────────────────────────┐
│ Total Revenue      [📈]  │
│ $125,430                │
│ +12.5% vs last month    │
└─────────────────────────┘
```

**Code:**
```tsx
<KPICard
  title="Total Revenue"
  value="$125,430"
  change={12.5}
  icon={TrendingUp}
/>
```

### Status Badges
```
[Active]  [Pending]  [Failed]  [Draft]
 Green     Yellow      Red      Gray
```

**Code:**
```tsx
<StatusBadge status="active" />
<StatusBadge status="pending" />
<StatusBadge status="failed" />
<StatusBadge status="draft" />
```

### Progress Bar
```
████████████░░░░░░░░ 65%
Complete
```

**Code:**
```tsx
<Progress value={65} />
<span>65%</span>
```

### Empty State
```
     [📦]
  No products yet
Get started by adding
   your first product
   
   [Add Product]
```

**Code:**
```tsx
<EmptyState
  icon={Package}
  title="No products yet"
  description="Get started by adding your first product"
  actionLabel="Add Product"
  onAction={handleAdd}
/>
```

### Action Menu
```
Row Data    [⋮]
            ├─ View
            ├─ Edit
            ├─ ──────
            └─ Delete
```

**Code:**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <MoreVertical />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>View</DropdownMenuItem>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## 🎨 Color Usage

### Status Colors
```
🟢 Green   - Success, Active, Completed, Passed
🟡 Yellow  - Warning, Pending, In Progress
🔴 Red     - Error, Failed, Overdue, Critical
⚪ Gray    - Neutral, Draft, Idle
🔵 Blue    - Info, New, Sent
🟣 Purple  - Special, Featured
🟠 Orange  - Alert, Low Stock
```

### Background Shades
```
50  - Very light backgrounds
100 - Light backgrounds for badges
600 - Primary text/icon colors
700 - Darker text for emphasis
```

### Usage Examples
```tsx
// Text colors
className="text-green-600"   // Success
className="text-red-600"     // Error
className="text-gray-500"    // Secondary text

// Background colors
className="bg-green-100"     // Success badge bg
className="bg-red-100"       // Error badge bg
className="bg-gray-50"       // Subtle background
```

## 📏 Spacing Scale

### Page Spacing
```
p-8       - Page padding
space-y-6 - Section spacing
gap-4     - Grid/flex gaps
mb-4      - Bottom margin
```

### Card Spacing
```
p-6  - Card content padding
p-4  - Compact card padding
p-3  - Very compact padding
```

### Visual Examples
```
┌────────────────────┐  ← p-6
│  space-y-6         │
│  ┌──────────┐     │  ← gap-4
│  │   p-4    │     │
│  └──────────┘     │
│  ┌──────────┐     │
│  │   p-4    │     │
│  └──────────┘     │
└────────────────────┘
```

## 🔤 Typography Hierarchy

```
h1  - Page titles (default from globals.css)
h2  - Section headings
h3  - Card titles
h4  - Subsection titles
p   - Body text
```

**Visual Scale:**
```
Page Title (h1)
━━━━━━━━━━━━━━

Section Heading (h2)
─────────────────

Card Title (h3)
──────────

Subsection (h4)
─────────

Body text (p) - Regular paragraph text in default size
```

## 📱 Responsive Grid

### Desktop (lg: 1024px+)
```
┌─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │
└─────┴─────┴─────┴─────┘
grid-cols-4
```

### Tablet (md: 768px+)
```
┌─────────┬─────────┐
│    1    │    2    │
├─────────┼─────────┤
│    3    │    4    │
└─────────┴─────────┘
grid-cols-2
```

### Mobile (default)
```
┌───────────────────┐
│         1         │
├───────────────────┤
│         2         │
├───────────────────┤
│         3         │
├───────────────────┤
│         4         │
└───────────────────┘
grid-cols-1
```

**Code:**
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
```

## 🎯 Common Patterns

### Search Bar with Icon
```
┌──────────────────────────────┐
│ 🔍 Search products...        │
└──────────────────────────────┘
```

**Code:**
```tsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
  <Input className="pl-10" placeholder="Search..." />
</div>
```

### Stats Summary Row
```
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ Total   │ │ Active  │ │ Pending │ │ Failed  │
│  100    │ │   85    │ │   12    │ │   3     │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
```

**Code:**
```tsx
<div className="grid grid-cols-4 gap-4">
  <Card className="p-4">
    <p className="text-sm text-gray-600">Total</p>
    <p className="text-2xl mt-1">100</p>
  </Card>
  {/* Repeat... */}
</div>
```

### Filter Row
```
┌──────────────┬───────────┬───────────┬──────────┐
│ [Search...] │ [Type ▼] │ [Status▼] │ [Filter] │
└──────────────┴───────────┴───────────┴──────────┘
```

**Code:**
```tsx
<Card className="p-4">
  <div className="flex gap-4">
    <Input placeholder="Search..." className="flex-1" />
    <Select>...</Select>
    <Select>...</Select>
    <Button variant="outline">Filter</Button>
  </div>
</Card>
```

### Table with Actions
```
┌──────────┬──────────┬──────────┬────────┐
│ Name     │ Status   │ Value    │ Actions│
├──────────┼──────────┼──────────┼────────┤
│ Item 1   │ [Active] │ $1,234   │   [⋮] │
│ Item 2   │ [Pend.]  │ $2,345   │   [⋮] │
│ Item 3   │ [Done]   │ $3,456   │   [⋮] │
└──────────┴──────────┴──────────┴────────┘
```

## 🎨 Icon Usage

### Icon Sizes
```
w-4 h-4  - Small icons (buttons, badges)
w-5 h-5  - Medium icons (cards)
w-6 h-6  - Large icons (KPI cards)
w-8 h-8  - Extra large (empty states)
```

### Icon Colors
```tsx
// In context
className="w-5 h-5 text-green-600"  // Success
className="w-5 h-5 text-red-600"    // Error
className="w-5 h-5 text-gray-400"   // Neutral
```

### Icon with Text
```
[📦] Products     [✓] Completed     [!] Warning
```

**Code:**
```tsx
<div className="flex items-center gap-2">
  <Package className="w-4 h-4" />
  <span>Products</span>
</div>
```

## 📋 Form Layouts

### Two Column Form
```
┌──────────────────┬──────────────────┐
│ Label 1          │ Label 2          │
│ [Input Field]    │ [Input Field]    │
│                  │                  │
│ Label 3          │ Label 4          │
│ [Dropdown ▼]     │ [Input Field]    │
└──────────────────┴──────────────────┘
```

**Code:**
```tsx
<div className="grid grid-cols-2 gap-6">
  <div>
    <Label>Label 1</Label>
    <Input />
  </div>
  <div>
    <Label>Label 2</Label>
    <Input />
  </div>
</div>
```

### Single Column Form
```
┌─────────────────────────────┐
│ Label 1                     │
│ [Input Field              ] │
│                            │
│ Label 2                     │
│ [Textarea                   │
│                             │
│  ]                          │
│                            │
│ Label 3                     │
│ [Dropdown ▼              ] │
└─────────────────────────────┘
```

## 🎯 Quick Reference

### Most Used Components
1. `Card` - Container for content
2. `Button` - Actions
3. `Table` - Data display
4. `Input` - Form fields
5. `Select` - Dropdowns
6. `Badge` - Status indicators
7. `Progress` - Progress bars
8. `Dialog` - Modals

### Most Used Widgets
1. `StatusBadge` - Auto-color statuses
2. `KPICard` - Metrics display
3. `EmptyState` - No data handling
4. `LoadingSpinner` - Loading states

### Most Used Layouts
1. List page with filters
2. Detail page with tabs
3. Editor with table
4. Dashboard with KPIs

## 💡 Tips

### Consistency Checklist
- ✅ Use StatusBadge for all status displays
- ✅ Use KPICard for metrics
- ✅ Use EmptyState when no data
- ✅ Add LoadingSpinner for loading
- ✅ Consistent spacing (p-8, space-y-6, gap-4)
- ✅ Icons from Lucide React
- ✅ Colors from defined palette

### Responsive Checklist
- ✅ Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- ✅ Flex: Add proper wrapping
- ✅ Hidden elements: `hidden md:block`
- ✅ Text size: Let globals.css handle it
- ✅ Padding: Adjust for mobile if needed

---

**Use this guide to maintain visual consistency across all ERP modules! 🎨**

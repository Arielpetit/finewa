

## Plan: Create Functional & E2E Test Suite JSON

Create a comprehensive JSON file at `docs/test-suite.json` containing functional and end-to-end tests organized by feature area. Each test has an `id`, `category`, `title`, `description`, `steps`, `expectedResult`, and a `result` field (initially `null`, set to `"pass"` or `"fail"` after running).

### Test Categories & Coverage

**Landing Page (3 tests)**: Page renders, demo CTA navigates to `/app/dashboard`, nav links scroll to sections.

**Dashboard (4 tests)**: Page renders with metric cards, needs attention section shows items, recent activity loads, sidebar navigation works.

**Catalog (6 tests)**: Table renders with items, create new item via form, edit item, delete item with confirmation, filter/search items, bulk select and actions.

**Suppliers (4 tests)**: Table renders, create supplier, edit supplier, delete supplier with linked-item guard.

**Purchase Orders (5 tests)**: Table renders with summary stats, create PO with line items, edit PO, receive shipment flow, delete PO.

**Inventory Requests (4 tests)**: Table renders, create request, approve request, decline request with reason.

**Stock Movements (3 tests)**: Table renders, record new movement, filter movements by type/date.

**Locations (3 tests)**: Tree renders, create location, transfer stock between locations.

**Settings (3 tests)**: Admin can access settings, manage categories, reset demo data.

**Navigation & Layout (3 tests)**: Sidebar links navigate correctly, command palette opens with Cmd+K, mobile bottom nav works.

**Analytics (2 tests)**: Stock analytics page renders charts, supplier/cost analytics render.

### File
- **`docs/test-suite.json`** — Single JSON file with array of ~40 test objects, each with a `result: null` field to track pass/fail.


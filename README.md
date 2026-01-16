# PEPPOL Invoice Management System

A modern, production-ready React application for managing and viewing PEPPOL invoices with real-time PDF preview capabilities. Built with performance, accessibility, and user experience in mind.

## 🚀 Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Lightning-fast build tool and dev server
- **React Router DOM v7** - Client-side routing with nested routes
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **Lucide React** - Beautiful, consistent icon library
- **ESLint & Prettier** - Code quality and formatting tools

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx   # Error handling boundary
│   ├── PdfViewer.tsx       # PDF viewer with error states
│   ├── Header.tsx          # Application header
│   ├── LeftNav.tsx         # Side navigation
│   ├── Modal.tsx           # Modal dialog component
│   ├── Dropdown.tsx        # Custom dropdown component
│   ├── SearchInput.tsx     # Search input with debounce
│   ├── Suspend.tsx         # Loading state wrapper
│   ├── NoContent.tsx       # Empty state component
│   └── NotImplement.tsx    # Feature placeholder
├── pages/               # Page components
│   └── invoices/
│       ├── page.tsx                    # Main invoice page router
│       ├── MasterDataTab.tsx           # Master data tab
│       ├── POMatchingTab.tsx           # PO matching tab (main feature)
│       ├── ProtestedTab.tsx            # Protested invoices
│       ├── ProcessedTab.tsx            # Processed invoices
│       ├── DeletedTab.tsx              # Deleted invoices
│       └── components/
│           ├── InvoiceTabs.tsx              # Tab navigation
│           ├── PoMatchingActionBar.tsx      # Search and filter bar
│           ├── PoMatchingInvoices.tsx       # Invoice list with sections
│           ├── PoMatchingInvoiceDetail.tsx  # Invoice detail view
│           └── InvoiceDetailTable.tsx       # Data table component
├── layouts/             # Layout components
│   ├── MainLayout.tsx      # Main app layout with header & sidebar
│   └── InvoicesLayout.tsx  # Invoice page layout with tabs
├── contexts/            # React context providers
│   └── InvoiceTabContext.tsx   # Tab state management
├── hooks/               # Custom React hooks
│   ├── useInvoiceTab.ts    # Invoice tab hook
│   └── useDebounce.ts      # Debounce hook for search
├── data/                # Mock data and fixtures
│   ├── mockInvoices.ts     # Invoice and table data generators
│   └── mockInvoiceTabs.ts  # Tab configuration
├── types/               # TypeScript type definitions
│   └── invoice.ts          # Invoice and tab types
├── utils/               # Utility functions
│   ├── cn.ts               # className utility (clsx wrapper)
│   └── downloadPdf.ts      # PDF download helper
├── App.tsx              # Root component with routing
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports

public/
└── pdfs/                # Static PDF assets
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository** (or extract the project):

```bash
cd cmc-system-invoice-peppol-test
```

2. **Install dependencies**:

```bash
npm install
```

3. **Add sample PDF files** (optional):
   - Place PDF files in `public/pdfs/` directory
   - The app uses external demo PDFs by default
   - Update `src/data/mockInvoices.ts` to use your own PDF files

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Build optimized production bundle:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

### Code Quality

Run ESLint for code linting:

```bash
npm run lint
```

Format code with Prettier:

```bash
npx prettier --write .
```

## 🎯 Application Usage

### Navigation

1. **Access the application** - Navigate to the Invoices page (automatically redirected from root)
2. **Select a tab** - Choose from Master Data, PO Matching, Protested, Processed, or Deleted
3. **View invoices** - The main implemented feature is the PO Matching tab

### PO Matching Tab

#### Search & Filter

- Use the search bar to find invoices by name, business code, or invoice code
- Select a status filter (All, Paid, Pending, Overdue) to narrow results
- Search is debounced for optimal performance

#### Invoice List

- Invoices are organized in collapsible sections
- Click section headers to expand/collapse
- Click any invoice to view its details
- Selected invoices are highlighted in blue

#### Invoice Details

- View invoice data and order data in separate tables
- PDF preview panel shows the invoice document
- Action buttons: Edit, Delete, Protest, Export (placeholders)

### URL State Management

The application uses URL parameters for state management:

- Tab selection: `?tab=po-matching`
- Navigation: `?path=/invoices`

This allows for:

- Bookmarkable pages
- Browser back/forward navigation
- Shareable links

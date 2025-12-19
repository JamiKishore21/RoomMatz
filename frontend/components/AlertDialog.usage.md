# Alert Dialog Component Usage Guide

## Overview
A beautiful, modern alert/confirmation dialog component that replaces the default browser `alert()` with a much better user experience.

## Features
- 🎨 Beautiful design with animations
- 🎭 Multiple types: warning, success, error, info
- ✨ Smooth fade-in and slide-up animations
- 🎯 Customizable title, message, and button text
- 🚀 Easy to use with React hooks

## Basic Usage

### 1. Import the Component
```jsx
import { useState } from "react";
import AlertDialog from "../components/AlertDialog";
```

### 2. Add State to Your Component
```jsx
const [showAlert, setShowAlert] = useState(false);
```

### 3. Add the AlertDialog to Your JSX
```jsx
<AlertDialog
  isOpen={showAlert}
  onClose={() => setShowAlert(false)}
  onConfirm={() => {
    // Your action here
    console.log("Confirmed!");
  }}
  title="Are you sure?"
  message="This action can't be undone. Please confirm if you want to proceed."
  type="warning"
/>
```

### 4. Trigger the Alert
```jsx
<button onClick={() => setShowAlert(true)}>
  Delete Item
</button>
```

## Complete Example

```jsx
import { useState } from "react";
import AlertDialog from "../components/AlertDialog";
import { Button } from "./ui/button";

const MyComponent = () => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDelete = () => {
    // Perform delete action
    console.log("Item deleted!");
  };

  return (
    <div>
      <Button onClick={() => setShowDeleteAlert(true)}>
        Delete Item
      </Button>

      <AlertDialog
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onConfirm={handleDelete}
        title="Delete Item?"
        message="This action cannot be undone. Are you sure you want to delete this item?"
        type="error"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | boolean | - | Controls dialog visibility (required) |
| `onClose` | function | - | Called when dialog should close (required) |
| `onConfirm` | function | - | Called when confirm button is clicked (required) |
| `title` | string | "Are you sure?" | Dialog title |
| `message` | string | "This action can't be undone..." | Dialog message |
| `type` | string | "warning" | Dialog type: "warning", "success", "error", "info" |
| `confirmText` | string | "Confirm" | Confirm button text |
| `cancelText` | string | "Cancel" | Cancel button text |
| `showCancel` | boolean | true | Show/hide cancel button |

## Alert Types

### Warning (Blue)
```jsx
<AlertDialog
  type="warning"
  title="Are you sure?"
  message="This action requires confirmation."
/>
```

### Success (Green)
```jsx
<AlertDialog
  type="success"
  title="Success!"
  message="Your action was completed successfully."
  showCancel={false}
  confirmText="OK"
/>
```

### Error (Red)
```jsx
<AlertDialog
  type="error"
  title="Delete Item?"
  message="This action cannot be undone."
  confirmText="Delete"
/>
```

### Info (Blue)
```jsx
<AlertDialog
  type="info"
  title="Information"
  message="Here's some important information."
  showCancel={false}
  confirmText="Got it"
/>
```

## Common Use Cases

### 1. Delete Confirmation
```jsx
const [showDelete, setShowDelete] = useState(false);

<AlertDialog
  isOpen={showDelete}
  onClose={() => setShowDelete(false)}
  onConfirm={handleDelete}
  title="Delete Room?"
  message="This will permanently delete the room. This action cannot be undone."
  type="error"
  confirmText="Delete"
/>
```

### 2. Logout Confirmation
```jsx
const [showLogout, setShowLogout] = useState(false);

<AlertDialog
  isOpen={showLogout}
  onClose={() => setShowLogout(false)}
  onConfirm={handleLogout}
  title="Logout?"
  message="Are you sure you want to logout?"
  type="warning"
  confirmText="Logout"
/>
```

### 3. Success Message
```jsx
const [showSuccess, setShowSuccess] = useState(false);

<AlertDialog
  isOpen={showSuccess}
  onClose={() => setShowSuccess(false)}
  onConfirm={() => setShowSuccess(false)}
  title="Booking Confirmed!"
  message="Your room has been successfully booked."
  type="success"
  showCancel={false}
  confirmText="OK"
/>
```

### 4. Information Alert
```jsx
const [showInfo, setShowInfo] = useState(false);

<AlertDialog
  isOpen={showInfo}
  onClose={() => setShowInfo(false)}
  onConfirm={() => setShowInfo(false)}
  title="Please Login"
  message="You need to login to access this feature."
  type="info"
  showCancel={false}
  confirmText="Go to Login"
/>
```

## Replacing Browser Alerts

### Before (Old Way)
```jsx
if (window.confirm("Are you sure you want to delete?")) {
  handleDelete();
}
```

### After (New Way)
```jsx
const [showAlert, setShowAlert] = useState(false);

// Trigger
<button onClick={() => setShowAlert(true)}>Delete</button>

// Dialog
<AlertDialog
  isOpen={showAlert}
  onClose={() => setShowAlert(false)}
  onConfirm={handleDelete}
  title="Delete Item?"
  message="Are you sure you want to delete?"
  type="error"
/>
```

## Styling Notes

The component uses:
- Tailwind CSS for styling
- Lucide React icons
- Custom animations (fade-in, slide-in-up, pulse-glow)
- Backdrop blur effect
- Smooth transitions

Make sure these animations are defined in your Tailwind config or global CSS!

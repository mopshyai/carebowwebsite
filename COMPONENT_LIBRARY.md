# CareBow Component Library

## Overview
This document outlines all reusable components for the CareBow platform, following best practices for maintainability, accessibility, and consistency.

---

## 🎨 Design Principles

1. **Consistency**: All components follow the same design language
2. **Accessibility**: WCAG 2.1 AA compliant
3. **Responsiveness**: Mobile-first design
4. **Reusability**: DRY principle - components are highly composable
5. **Type Safety**: Full TypeScript support
6. **Performance**: Optimized for speed

---

## 📁 Component Structure

```
src/components/
├── ui/                 # Base UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Alert.tsx
│   ├── Badge.tsx
│   ├── Spinner.tsx
│   ├── Tabs.tsx
│   ├── Dropdown.tsx
│   └── Avatar.tsx
├── forms/              # Form-specific components
│   ├── FormInput.tsx
│   ├── FormSelect.tsx
│   ├── FormTextarea.tsx
│   ├── FormCheckbox.tsx
│   ├── FormRadio.tsx
│   ├── FileUpload.tsx
│   └── DatePicker.tsx
├── layout/             # Layout components
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Container.tsx
│   └── Grid.tsx
├── auth/               # Authentication components
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── GoogleButton.tsx
│   ├── AuthGuard.tsx
│   └── RememberMe.tsx
├── dashboard/          # Dashboard components
│   ├── DashboardLayout.tsx
│   ├── StatsCard.tsx
│   ├── QuickAction.tsx
│   ├── ActivityFeed.tsx
│   ├── NotificationBell.tsx
│   └── UserMenu.tsx
├── caregivers/         # Caregiver-specific components
│   ├── CaregiverCard.tsx
│   ├── CaregiverFilter.tsx
│   ├── BookingModal.tsx
│   ├── RatingStars.tsx
│   └── AvailabilityCalendar.tsx
└── shared/             # Other shared components
    ├── ErrorBoundary.tsx
    ├── LoadingScreen.tsx
    └── EmptyState.tsx
```

---

## 🧩 Component Implementations

### 1. UI Components

#### Button Component
```typescript
// src/components/ui/Button.tsx
"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md",
    secondary: "bg-pink-600 text-white hover:bg-pink-700 shadow-sm hover:shadow-md",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    ghost: "text-gray-600 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && icon}
      {children}
    </motion.button>
  );
}
```

#### Card Component
```typescript
// src/components/ui/Card.tsx
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  padding = "md",
  hoverable = false,
  onClick,
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const hoverClass = hoverable
    ? "cursor-pointer hover:shadow-lg transition-shadow duration-200"
    : "";

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm ${paddings[padding]} ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
```

#### Modal Component
```typescript
// src/components/ui/Modal.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
}: ModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[9999]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`bg-white rounded-xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
```

#### Alert Component
```typescript
// src/components/ui/Alert.tsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function Alert({
  type,
  message,
  onClose,
  autoClose = true,
  duration = 5000,
}: AlertProps) {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const styles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 z-[10001] max-w-md w-full border rounded-lg shadow-lg p-4 ${styles[type]}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
```

#### Badge Component
```typescript
// src/components/ui/Badge.tsx
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
}

export default function Badge({ children, variant = "primary", size = "md" }: BadgeProps) {
  const variants = {
    primary: "bg-indigo-100 text-indigo-800",
    secondary: "bg-pink-100 text-pink-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}
```

#### Spinner Component
```typescript
// src/components/ui/Spinner.tsx
interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}

export default function Spinner({ size = "md", color = "indigo" }: SpinnerProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center">
      <svg
        className={`animate-spin ${sizes[size]} text-${color}-600`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}
```

#### Tabs Component
```typescript
// src/components/ui/Tabs.tsx
"use client";

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export default function Tabs({ tabs, defaultTab, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-4 overflow-x-auto scrollbar-hide" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="py-6"
      >
        {activeTabContent}
      </motion.div>
    </div>
  );
}
```

---

### 2. Form Components

#### FormInput Component
```typescript
// src/components/forms/FormInput.tsx
"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, icon, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full px-3 py-2 border rounded-lg shadow-sm
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
              ${icon ? "pl-10" : ""}
              ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
              ${className}
            `}
            {...props}
          />
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {!error && helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
```

#### FileUpload Component
```typescript
// src/components/forms/FileUpload.tsx
"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Upload, X, File } from "lucide-react";
import Button from "../ui/Button";

interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFileSelect: (files: File[]) => void;
  error?: string;
}

export default function FileUpload({
  label,
  accept,
  multiple = false,
  maxSize = 10,
  onFileSelect,
  error,
}: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      const sizeMB = file.size / 1024 / 1024;
      return sizeMB <= maxSize;
    });

    setSelectedFiles(multiple ? [...selectedFiles, ...validFiles] : validFiles);
    onFileSelect(validFiles);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFileSelect(newFiles);
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-400"}
          ${error ? "border-red-500" : ""}
        `}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 mb-1">
          Drag and drop files here, or click to select
        </p>
        <p className="text-xs text-gray-500">Maximum file size: {maxSize}MB</p>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### 3. Dashboard Components

#### DashboardLayout Component
```typescript
// src/app/(dashboard)/_components/DashboardLayout.tsx
"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "FAMILY" | "CAREGIVER" | "ADMIN";
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        userType={userType}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
```

#### StatsCard Component
```typescript
// src/components/dashboard/StatsCard.tsx
import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import Card from "../ui/Card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

export default function StatsCard({ title, value, icon, trend, subtitle }: StatsCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>

          {trend && (
            <div className="mt-2 flex items-center gap-1">
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.value}%
              </span>
              <span className="text-sm text-gray-500">{subtitle}</span>
            </div>
          )}
        </div>

        <div className="p-3 bg-indigo-100 rounded-lg">
          <div className="text-indigo-600">{icon}</div>
        </div>
      </div>
    </Card>
  );
}
```

---

### 4. Caregiver Components

#### CaregiverCard Component
```typescript
// src/components/caregivers/CaregiverCard.tsx
import { MapPin, Star, Clock, DollarSign } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";

interface CaregiverCardProps {
  caregiver: {
    id: string;
    name: string;
    image?: string;
    type: string;
    bio: string;
    rating: number;
    reviewCount: number;
    hourlyRate: number;
    location: string;
    experience: number;
    specializations: string[];
    verified: boolean;
  };
  onBook: (caregiverId: string) => void;
  onViewProfile: (caregiverId: string) => void;
}

export default function CaregiverCard({ caregiver, onBook, onViewProfile }: CaregiverCardProps) {
  return (
    <Card hoverable>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Avatar
            src={caregiver.image}
            alt={caregiver.name}
            size="lg"
            verified={caregiver.verified}
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Name & Type */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{caregiver.name}</h3>
              <Badge variant="info" size="sm">
                {caregiver.type}
              </Badge>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium">{caregiver.rating}</span>
              </div>
              <p className="text-xs text-gray-500">({caregiver.reviewCount} reviews)</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{caregiver.bio}</p>

          {/* Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>${caregiver.hourlyRate}/hr</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{caregiver.experience} yrs</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{caregiver.location}</span>
            </div>
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap gap-2 mb-4">
            {caregiver.specializations.slice(0, 3).map((spec, index) => (
              <Badge key={index} variant="primary" size="sm">
                {spec}
              </Badge>
            ))}
            {caregiver.specializations.length > 3 && (
              <Badge variant="primary" size="sm">
                +{caregiver.specializations.length - 3} more
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="primary" size="sm" onClick={() => onBook(caregiver.id)}>
              Book Now
            </Button>
            <Button variant="outline" size="sm" onClick={() => onViewProfile(caregiver.id)}>
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
```

#### RatingStars Component
```typescript
// src/components/caregivers/RatingStars.tsx
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export default function RatingStars({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = false,
  interactive = false,
  onRate,
}: RatingStarsProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (index: number) => {
    if (interactive && onRate) {
      onRate(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          disabled={!interactive}
          className={interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}
        >
          <Star
            className={`${sizes[size]} ${
              index < Math.floor(rating)
                ? "text-yellow-500 fill-current"
                : index < rating
                ? "text-yellow-500 fill-current opacity-50"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}

      {showNumber && (
        <span className="ml-2 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
```

---

## 📦 Component Usage Examples

### Example 1: Using Button
```typescript
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

<Button variant="primary" size="md" icon={<Plus />} onClick={handleClick}>
  Add New
</Button>
```

### Example 2: Using Modal
```typescript
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Action" size="md">
  <p>Are you sure you want to proceed?</p>
  <div className="flex gap-2 mt-4">
    <Button variant="danger" onClick={handleConfirm}>Confirm</Button>
    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
  </div>
</Modal>
```

### Example 3: Using FileUpload
```typescript
import FileUpload from "@/components/forms/FileUpload";

<FileUpload
  label="Upload Certification"
  accept=".pdf,.jpg,.png"
  maxSize={5}
  onFileSelect={(files) => console.log(files)}
/>
```

---

## 🎯 Best Practices

1. **Always use TypeScript** for type safety
2. **Make components accessible** (ARIA labels, keyboard navigation)
3. **Keep components small and focused** (single responsibility)
4. **Use composition** over prop drilling
5. **Memoize expensive computations** with useMemo
6. **Use proper error boundaries**
7. **Follow consistent naming** (PascalCase for components)
8. **Add proper documentation** (JSDoc comments)

---

This component library provides a solid foundation for building consistent, accessible, and maintainable UI across the CareBow platform!

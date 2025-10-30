
import React from 'react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  editMode: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({ value, onChange, className = "", multiline = false, editMode }) => {
  if (!editMode) return <span className={className}>{value}</span>;

  const baseClasses = "border-2 border-blue-400 bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} ${baseClasses} px-2 py-1 w-full`}
        rows={3}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${className} ${baseClasses} px-2 py-1`}
    />
  );
};

export default EditableText;

import { useState } from "react";
import { ChevronDown, Layers } from "lucide-react";
import { Department } from "@/services/university";

interface DepartmentsListProps {
  departments?: Department[];
  compact?: boolean;
}

export const DepartmentsList = ({ departments, compact = false }: DepartmentsListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!departments || departments.length === 0) return null;

  return (
    <div className={compact ? "mt-2" : "mt-3"}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 transition-all duration-200 active:scale-95"
      >
        <Layers size={14} />
        <span>الأقسام ({departments.length})</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="mt-3 grid gap-2 animate-fade-in">
          {departments.map((department) => (
            <li
              key={department.id}
              className="flex items-start gap-2 rounded-lg border border-border/50 bg-background/40 px-3 py-2"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{department.name}</p>
                {department.name_en && (
                  <p className="text-xs text-muted-foreground truncate">{department.name_en}</p>
                )}
                {department.description && (
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {department.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { useData } from "../../context/DataContext";
import { SITE_CONTEXT } from "../../constants/SITE_CONTEXT";

type SiteContextItem = {
  id: string;
  type: string;
};

type DataContextSelectorProps = {
  /** Optional: override the value (defaults to context value) */
  value?: string;
  /** Optional: override the onChange handler (defaults to context setter) */
  onChange?: (newValue: string) => void;
  /** Optional: custom className for the trigger */
  className?: string;
  /** Optional: custom style for the wrapper */
  style?: React.CSSProperties;
};

export const DataContextSelector = ({
  value: valueProp,
  onChange: onChangeProp,
  className,
  style,
}: DataContextSelectorProps = {}) => {
  const { dataContext, setDataContext } = useData();

  // Use props if provided, otherwise fall back to context
  const value = valueProp ?? dataContext;
  const onChange = onChangeProp ?? setDataContext;

  return (
    <div style={style}>
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className={className} style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid var(--border-1, #ccc)',
        backgroundColor: 'var(--bg-2, #fff)',
        color: 'var(--text-1, #000)',
        cursor: 'pointer',
        fontSize: '14px',
        width: '100%',
      }}>
        <Select.Value placeholder="Select Context" />
        <Select.Icon>
          <ChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          style={{
            backgroundColor: 'var(--bg-2, #fff)',
            border: '1px solid var(--border-1, #ccc)',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            overflow: 'hidden',
          }}
        >
          <Select.Viewport style={{ padding: '4px' }}>
            {(SITE_CONTEXT as SiteContextItem[])
              .filter((ctx) => ctx.id !== "default")
              .map((ctx) => (
              <Select.Item
                key={ctx.id}
                value={ctx.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontSize: '14px',
                  color: 'var(--text-1, #000)',
                  outline: 'none',
                }}
              >
                <Select.ItemIndicator style={{ width: '16px' }}>
                  <Check size={16} />
                </Select.ItemIndicator>
                <Select.ItemText>{ctx.type}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
    </div>
  );
};

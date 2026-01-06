import { ReactNode } from "react";
import { Info, AlertTriangle, CheckCircle, XCircle, Lightbulb } from "lucide-react";

type CalloutType = "info" | "warning" | "success" | "error" | "tip";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  { icon: typeof Info; bgClass: string; borderClass: string; iconClass: string }
> = {
  info: {
    icon: Info,
    bgClass: "bg-blue-500/10",
    borderClass: "border-blue-500/30",
    iconClass: "text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-yellow-500/10",
    borderClass: "border-yellow-500/30",
    iconClass: "text-yellow-400",
  },
  success: {
    icon: CheckCircle,
    bgClass: "bg-green-500/10",
    borderClass: "border-green-500/30",
    iconClass: "text-green-400",
  },
  error: {
    icon: XCircle,
    bgClass: "bg-red-500/10",
    borderClass: "border-red-500/30",
    iconClass: "text-red-400",
  },
  tip: {
    icon: Lightbulb,
    bgClass: "bg-purple-500/10",
    borderClass: "border-purple-500/30",
    iconClass: "text-purple-400",
  },
};

export default function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`my-6 p-4 rounded-xl border ${config.bgClass} ${config.borderClass}`}
    >
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.iconClass}`} />
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-medium text-foreground mb-1">{title}</p>
          )}
          <div className="text-sm text-muted-foreground [&>p]:m-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

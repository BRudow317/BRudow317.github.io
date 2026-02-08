import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type PillFrameOwnProps = {
	as?: ElementType;
	className?: string;
	children?: ReactNode;
	variant?: "default" | "muted" | "accent";
	size?: "sm" | "md" | "lg";
};

export type PillFrameProps<T extends ElementType = "span"> =
	PillFrameOwnProps &
	Omit<ComponentPropsWithoutRef<T>, keyof PillFrameOwnProps | "as">;

const cx = (...classes: Array<string | undefined | false>) =>
	classes.filter(Boolean).join(" ");

export const PillFrame = <T extends ElementType = "span">({
	as,
	className,
	children,
	variant = "default",
	size = "md",
	...rest
}: PillFrameProps<T>) => {
	const Component = (as ?? "span") as ElementType;

	return (
		<Component
			className={cx("pill", "pill-frame", className)}
			data-variant={variant}
			data-size={size}
			{...rest}
		>
			{children}
		</Component>
	);
};

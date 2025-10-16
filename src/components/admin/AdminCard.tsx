import { PropsWithChildren } from "react";

type AdminCardProps = PropsWithChildren<{
  title: string;
  description?: string;
  actions?: React.ReactNode;
}>;

export function AdminCard({
  title,
  description,
  actions,
  children,
}: AdminCardProps) {
  return (
    <section className='rounded-lg p-6 space-y-2 bg-white shadow-lg'>
      <header className='flex items-center justify-between'>
        <div>
          <h3 className='font-medium text-primary'>{title}</h3>
          {description ? (
            <p className='text-sm text-black'>{description}</p>
          ) : null}
        </div>
        {actions}
      </header>
      <div>{children}</div>
    </section>
  );
}

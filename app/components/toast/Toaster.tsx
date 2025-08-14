import { } from 'react';
import { useToast } from './ToastContext';

export function Toaster() {
	const { toasts, dismiss } = useToast();
	return (
		<div className="fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4 pointer-events-none">
			{toasts.map((t) => (
				<div
					key={t.id}
					role="status"
					aria-live="polite"
					className="pointer-events-auto w-full max-w-sm rounded-lg border bg-white/90 backdrop-blur shadow-md dark:bg-slate-900/80 dark:border-slate-700"
				>
					<div className="flex items-start gap-3 p-3">
						<div className="mt-0.5">
							{t.type === 'success' && (
								<span className="inline-block size-2 rounded-full bg-emerald-500" />
							)}
							{t.type === 'error' && (
								<span className="inline-block size-2 rounded-full bg-red-500" />
							)}
							{t.type === 'info' && (
								<span className="inline-block size-2 rounded-full bg-blue-500" />
							)}
							{t.type === 'warning' && (
								<span className="inline-block size-2 rounded-full bg-amber-500" />
							)}
						</div>
						<div className="flex-1 min-w-0">
							{t.title && (
								<div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.title}</div>
							)}
							{t.description && (
								<div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{t.description}</div>
							)}
						</div>
						<button
							className="ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
							onClick={() => dismiss(t.id)}
							aria-label="Dismiss notification"
						>
							×
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default Toaster;

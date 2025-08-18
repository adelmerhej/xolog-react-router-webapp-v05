"use client";

import React, { useEffect, useState } from 'react';
import { Menu, Sun, Moon, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import clsx from 'clsx';
import { clearAuthToken, clearAuthUser, getAuthUser, type StoredUser } from '~/lib/auth';

interface NavSection {
	title: string;
	items: { label: string; href: string }[];
}

const nav: NavSection[] = [
	{
		title: 'KPI Analytic',
		items: [
			{ label: 'Dashboard', href: '/dashboard' },
			{ label: 'Sales report', href: '/reports/sales' },
		],
	},
	{
		title: 'Reports',
		items: [
			{ label: 'To Be Loaded', href: '/reports/to-be-loaded' },
			{ label: 'On Water', href: '/reports/on-water' },
			{ label: 'Under Clearance', href: '/reports/under-clearance' },
			{ label: 'Invoice Status', href: '/reports/invoice-status' },
		],
	},
	{
		title: 'Settings',
		items: [{ label: 'User profile', href: '/settings/profile' }],
	},
];

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	// Start with a stable SSR value; detect real preference after mount
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const [profileOpen, setProfileOpen] = useState(false);
	// Defer reading localStorage until after mount for hydration safety
	const [user, setUser] = useState<StoredUser | null>(null);
	const [mounted, setMounted] = useState(false);

useEffect(() => {
		setMounted(true);
		// Resolve system theme after mount
		try {
			if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				setTheme('dark');
			}
		} catch {}
	}, []);

useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark');
	}, [theme]);

	useEffect(() => {
		// Refresh user from storage in case it changed elsewhere
		setUser(getAuthUser());
	}, []);

	const handleLogout = () => {
		clearAuthToken();
		clearAuthUser();
		setUser(null);
		navigate('/login');
	};

	return (
		<div className="flex h-screen w-full bg-gradient-to-br from-white to-sky-50 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100">
			{/* Sidebar */}
			<aside
				className={clsx(
					'flex flex-col bg-white/80 dark:bg-slate-900/70 backdrop-blur border-r border-sky-100 dark:border-slate-700 transition-all duration-300',
					collapsed ? 'w-16' : 'w-64',
					'hidden md:flex'
				)}
			>
				<div className="flex items-center justify-between px-4 h-14 border-b border-sky-100 dark:border-slate-700">
					<span className={clsx('font-bold text-sky-600 dark:text-sky-400 whitespace-nowrap transition-opacity', collapsed && 'opacity-0 pointer-events-none')}>XOLOG</span>
					<button onClick={() => setCollapsed((c) => !c)} className="p-1 rounded hover:bg-sky-100 dark:hover:bg-slate-700">
						{collapsed ? '›' : '‹'}
					</button>
				</div>
				<nav className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
					{nav.map((sec) => (
						<div key={sec.title}>
							<div className={clsx('px-2 text-xs uppercase tracking-wide font-semibold text-sky-500 dark:text-sky-400 mb-2', collapsed && 'hidden')}>{sec.title}</div>
							<ul className="space-y-1">
								{sec.items.map((item) => (
									<li key={item.href}>
										<Link
											to={item.href}
											className={clsx(
												'flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-sky-100/70 dark:hover:bg-slate-700/60',
												collapsed && 'justify-center'
											)}
										>
											<span className={clsx(collapsed && 'sr-only')}>{item.label}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>
				<div className="p-3 text-xs text-center text-slate-400 dark:text-slate-500">v0.1.0</div>
			</aside>
			{/* Mobile Drawer */}
			{mobileOpen && (
				<div className="md:hidden fixed inset-0 z-40 flex">
					<div className="w-64 bg-white dark:bg-slate-900 p-4 space-y-6 overflow-y-auto">
						{nav.map((sec) => (
							<div key={sec.title}>
								<div className="text-xs uppercase tracking-wide font-semibold text-sky-500 dark:text-sky-400 mb-2">{sec.title}</div>
								<ul className="space-y-1">
									{sec.items.map((item) => (
										<li key={item.href}>
											<Link onClick={() => setMobileOpen(false)} to={item.href} className="block px-3 py-2 rounded-md text-sm hover:bg-sky-100 dark:hover:bg-slate-700">
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
					<div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
				</div>
			)}
			<div className="flex-1 flex flex-col min-w-0">
				{/* Top Bar */}
				<header className="h-14 flex items-center gap-3 px-4 border-b border-sky-100 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 backdrop-blur z-10">
					<button className="md:hidden p-2 rounded hover:bg-sky-100 dark:hover:bg-slate-700" onClick={() => setMobileOpen(true)} aria-label="Open menu">
						<Menu className="h-5 w-5" />
					</button>
					  <div className="flex-1 font-semibold text-sky-600 dark:text-sky-300">{mounted && user?.role ? `Welcome ${user?.name}` : 'XOLOG Platform'}</div>
					<button
						onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
						className="p-2 rounded hover:bg-sky-100 dark:hover:bg-slate-700"
						aria-label="Toggle theme"
					>
						{theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
					</button>
					<button className="relative p-2 rounded hover:bg-sky-100 dark:hover:bg-slate-700" aria-label="Notifications">
						<Bell className="h-5 w-5" />
						<span className="absolute -top-0.5 -right-0.5 bg-red-500 text-[10px] leading-none rounded-full px-1 text-white">3</span>
					</button>
					<div className="relative">
						<button onClick={() => setProfileOpen((o) => !o)} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-sky-100 dark:hover:bg-slate-700">
							<div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 text-white grid place-items-center font-bold text-sm">
								{mounted && user?.name?.[0] ? user.name[0].toUpperCase() : 'U'}
							</div>
							<span className="hidden sm:inline text-sm">{mounted && user?.name ? user.name : 'Guest'}</span>
						</button>
						{profileOpen && (
							<div className="absolute right-0 mt-2 w-56 rounded-lg border border-sky-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-3 space-y-2 text-sm">
								<div className="font-semibold">{mounted && user?.name ? user.name : 'Guest User'}</div>
								<div className="text-xs text-slate-500 dark:text-slate-400">Role: {mounted && user?.role ? user.role : 'n/a'}</div>
								<hr className="border-sky-100 dark:border-slate-700" />
								<Link to="/settings/profile" className="block px-2 py-1 rounded hover:bg-sky-100 dark:hover:bg-slate-700">
									Settings
								</Link>
								{mounted && user ? (
									<button
										onClick={handleLogout}
										className="w-full text-left px-2 py-1 rounded hover:bg-sky-100 dark:hover:bg-slate-700"
									>
										Logout
									</button>
								) : (
									<Link to="/login" className="block px-2 py-1 rounded hover:bg-sky-100 dark:hover:bg-slate-700">
										Login
									</Link>
								)}
							</div>
						)}
					</div>
				</header>
				<main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
			</div>
		</div>
	);
};

export default AppLayout;

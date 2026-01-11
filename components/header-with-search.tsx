"use client"
import React from 'react';
import { Grid2x2PlusIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Sheet, SheetContent, SheetFooter, SheetTitle } from '@/components/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CommandItem, SearchModal } from '@/components/search-modal';
import { toolsData } from '@/lib/tools-data';



export function Header() {
	const [open, setOpen] = React.useState(false);
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	const links = [
		{
			label: 'Tools',
			href: '/tools',
		},
		{
			label: 'About',
			href: '/about',
		},
		{
			label: 'Changelog',
			href: '/changelog',
		},
		{
			label: 'Privacy',
			href: '/privacy',
		},
		{
			label: 'Terms',
			href: '/terms',
		},
		{
			label: 'Feedback',
			href: '/feedback-tool',
		},
		{
			label: 'Settings',
			href: '/settings',
		},
	];

	return (
		<header
			className={cn(
				'sticky top-0 z-50 w-full backdrop-blur-xl',
				'bg-background/20 supports-[backdrop-filter]:bg-background/20',
			)}
		>
			<nav className="flex h-14 w-full items-center justify-between px-6">
				<a href="/" className="group hover:bg-white/5 flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2 duration-300">
					<div className="bg-secondary/10 p-2 rounded-xl border border-white/5 shadow-inner group-hover:bg-secondary/20 transition-colors">
						<img src="/cameleon.png" alt="Cameleon Logo" className="size-7 object-contain group-hover:scale-110 transition-transform duration-300" />
					</div>
					<div className="flex flex-col -space-y-1">
						<p className="font-product text-lg font-bold text-primary tracking-tight">Spunix</p>
						<p className="font-product text-[10px] text-foreground/50 uppercase tracking-[0.2em] font-bold">Cameleon Suite</p>
					</div>
				</a>
				<div className="flex items-center gap-2">
					<div className="hidden items-center gap-1 lg:flex">
						{links.map((link) => (
							<a
								key={link.label}
								className={buttonVariants({ variant: 'ghost' })}
								href={link.href}
							>
								{link.label}
							</a>
						))}
						{/* <Button variant="outline">Sign In</Button>
					<Button>Get Started</Button> */}
					</div>
					{mounted ? (
						<>
							<SearchModal data={tools}>
								<Button
									variant="outline"
									className="relative size-9 cursor-pointer p-0 md:border xl:h-9 xl:w-60 xl:justify-between xl:px-3 xl:py-2"
								>
									<span className="hidden xl:inline-flex">Search...</span>
									<span className="sr-only">Search</span>
									<SearchIcon className="size-4" />
								</Button>
							</SearchModal>
							<Sheet open={open} onOpenChange={setOpen}>
								<Button
									size="icon"
									variant="outline"
									onClick={() => setOpen(!open)}
									className="lg:hidden"
								>
									<MenuIcon className="size-4" />
								</Button>
								<SheetContent
									className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
									showClose={false}
									side="left"
								>
									<SheetTitle className="sr-only">Menu</SheetTitle>
									<div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
										{links.map((link) => (
											<a
												key={link.label}
												className={buttonVariants({
													variant: 'ghost',
													className: 'justify-start',
												})}
												href={link.href}
											>
												{link.label}
											</a>
										))}
									</div>
									<SheetFooter>
										<Button variant="outline">Sign In</Button>
										<Button>Get Started</Button>
									</SheetFooter>
								</SheetContent>
							</Sheet>
						</>
					) : (
						<Button
							variant="outline"
							className="relative size-9 cursor-pointer p-0 md:border xl:h-9 xl:w-60 xl:justify-between xl:px-3 xl:py-2"
						>
							<span className="hidden xl:inline-flex">Search...</span>
							<span className="sr-only">Search</span>
							<SearchIcon className="size-4" />
						</Button>
					)}
				</div>
			</nav>
		</header>
	);
}

const tools = toolsData;

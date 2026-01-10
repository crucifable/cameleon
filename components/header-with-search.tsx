"use client"
import React from 'react';
import { Grid2x2PlusIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetTitle } from '@/components/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CommandItem, SearchModal } from '@/components/search-modal';
import { toolsData } from '@/lib/tools-data';



export function Header() {
	const [open, setOpen] = React.useState(false);

	const links = [
		{
			label: 'Features',
			href: '#',
		},
		{
			label: 'Pricing',
			href: '#',
		},
		{
			label: 'About',
			href: '#',
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
				<div className="hover:bg-accent flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 duration-100">
					<img src="/cameleon.png" alt="Cameleon Logo" className="size-6" />
					<p className="font-product text-md font-bold">Crucible</p>
					<p className="font-product text-md">Cameleon</p>
				</div>
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
				</div>
			</nav>
		</header>
	);
}

const tools = toolsData;

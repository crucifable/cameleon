import React from 'react';
import { useRouter } from 'next/navigation';
import {
	Modal,
	ModalContent,
	ModalTitle,
	ModalTrigger,
} from '@/components/modal';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';

import { LucideIcon, SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export type CommandItem = {
	id: string;
	title: string;
	description: string;
	category: string;
	icon?: LucideIcon;
	shortcut?: string;
};

type SearchModalProps = {
	children: React.ReactNode;
	data: CommandItem[];
};


export function SearchModal({ children, data }: SearchModalProps) {
	const [open, setOpen] = React.useState(false);
	const [query, setQuery] = React.useState('');
	const router = useRouter();

	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>{children}</ModalTrigger>
			<ModalContent className="p-0 border-none bg-transparent">
				<ModalTitle className="sr-only">Search Tools</ModalTitle>
				<Command className="bg-background/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
					<CommandInput
						className="h-14"
						placeholder="Search for tools (e.g. PDF, Image, Metadata)..."
						value={query}
						onValueChange={setQuery}
					/>
					<CommandList className="max-h-[70vh] p-2 custom-scrollbar">
						<CommandEmpty className="flex flex-col items-center justify-center py-12">
							<div className="bg-secondary/20 p-4 rounded-full mb-4">
								<SearchIcon className="text-muted-foreground size-8" />
							</div>
							<p className="text-muted-foreground font-medium">
								No results found for "{query}"
							</p>
							<Button onClick={() => setQuery('')} variant="link" className="mt-2 text-primary">
								Clear search
							</Button>
						</CommandEmpty>
						<CommandGroup heading="Available Tools" className="text-xs uppercase tracking-widest text-muted-foreground/50 px-3 pb-2 font-bold">
							{data.map((item) => (
								<CommandItem
									key={item.id}
									className="flex cursor-pointer items-center gap-4 p-3 rounded-xl transition-all hover:bg-white/5 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary mb-1"
									value={`${item.title} ${item.description} ${item.category}`}
									onSelect={() => {
										router.push(`/tools/${item.id}`);
										setOpen(false);
										setQuery('');
									}}
								>
									<div className="size-10 rounded-xl bg-secondary/30 flex items-center justify-center border border-white/5">
										{item.icon ? <item.icon className="size-5" /> : <SearchIcon className="size-5" />}
									</div>
									<div className="flex flex-col flex-1">
										<p className="text-sm font-bold">
											{item.title}
										</p>
										<p className="text-xs text-muted-foreground line-clamp-1">
											{item.description}
										</p>
									</div>
									<Badge variant="secondary" className="ml-auto text-[10px] bg-secondary/50 border-none">
										{item.category}
									</Badge>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</ModalContent>
		</Modal>
	);
}
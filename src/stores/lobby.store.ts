import { SvelteStore, Prop, Derived } from 'sveltejs-typestore';

import type { GameLocation } from '@/stores';

export enum VoteMode {
	ANYTIME = 'ANYTIME',
	END = 'END',
}

export class Player {
	public role: string | null; // null = spy, string = civilian role from location
	public time: number;
	public eliminated: boolean;
}

export class LobbyStore extends SvelteStore {
	@Prop({ default: {} })
	public players: Record<string, Partial<Player>>;

	@Prop({ default: 1 })
	public spies: number;

	@Prop({ default: 60 })
	public duration: number;

	@Prop({ default: VoteMode.ANYTIME })
	public vote: VoteMode;

	@Prop({ default: true })
	public blindSpies: boolean;

	@Prop({ default: false })
	public paused: boolean;

	@Prop({ default: undefined })
	public location: GameLocation;

	@Derived()
	public playerCount() {
		return Object.keys(this.players).length;
	}

	public removePlayer(name: string) {
		this.update((s) => {
			const { [name]: _, ...players } = s.players;
			return { ...s, players };
		});
	}

	@Derived()
	public getRandomRoles() {
		const { roles } = this.location;
		const length = Object.keys(this.players).length - this.spies;

		return [
			...Array(this.spies).fill(null),
			...Array.from({ length }, (_, i) => roles[i % roles.length]),
		].sort(() => Math.random() - 0.5);
	}
}

export const lobby = new LobbyStore();

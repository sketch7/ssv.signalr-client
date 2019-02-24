import { HubConnection } from "../hub-connection";

// import * as signalr from "@aspnet/signalr";
jest.genMockFromModule("@aspnet/signalr");
jest.mock("@aspnet/signalr");

let nextUniqueId = 0;

export interface HeroHub {
	UpdateHero: string;
}

export function createSUT() {
	return new HubConnection<HeroHub>({
		key: `hero-${nextUniqueId++}`,
		endpointUri: "/hero",
		defaultData: () => ({ tenant: "kowalski", power: "2000" }),
		options: {
			retry: {
				maximumAttempts: 3,
				backOffStrategy: {
					delayRetriesMs: 10,
					maxDelayRetriesMs: 10
				}
			},
		}
	});
}

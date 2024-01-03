export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","Kevlyar-Mylar-300x219.jpg","swlogo66.png"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.fec194df.js","app":"_app/immutable/entry/app.0e8ae0f1.js","imports":["_app/immutable/entry/start.fec194df.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/singletons.ad6f0023.js","_app/immutable/chunks/paths.b72c4b6f.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/control.f2d6eca3.js","_app/immutable/entry/app.0e8ae0f1.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js')),
			__memo(() => import('../output/server/nodes/10.js')),
			__memo(() => import('../output/server/nodes/11.js')),
			__memo(() => import('../output/server/nodes/12.js')),
			__memo(() => import('../output/server/nodes/13.js')),
			__memo(() => import('../output/server/nodes/14.js')),
			__memo(() => import('../output/server/nodes/15.js')),
			__memo(() => import('../output/server/nodes/16.js')),
			__memo(() => import('../output/server/nodes/17.js')),
			__memo(() => import('../output/server/nodes/18.js')),
			__memo(() => import('../output/server/nodes/19.js')),
			__memo(() => import('../output/server/nodes/20.js')),
			__memo(() => import('../output/server/nodes/21.js')),
			__memo(() => import('../output/server/nodes/22.js')),
			__memo(() => import('../output/server/nodes/23.js')),
			__memo(() => import('../output/server/nodes/24.js')),
			__memo(() => import('../output/server/nodes/25.js')),
			__memo(() => import('../output/server/nodes/26.js')),
			__memo(() => import('../output/server/nodes/27.js')),
			__memo(() => import('../output/server/nodes/28.js')),
			__memo(() => import('../output/server/nodes/29.js')),
			__memo(() => import('../output/server/nodes/30.js')),
			__memo(() => import('../output/server/nodes/31.js')),
			__memo(() => import('../output/server/nodes/32.js')),
			__memo(() => import('../output/server/nodes/33.js')),
			__memo(() => import('../output/server/nodes/34.js')),
			__memo(() => import('../output/server/nodes/35.js')),
			__memo(() => import('../output/server/nodes/36.js')),
			__memo(() => import('../output/server/nodes/37.js')),
			__memo(() => import('../output/server/nodes/38.js')),
			__memo(() => import('../output/server/nodes/39.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/claimComp",
				pattern: /^\/api\/claimComp\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/claimComp/_server.ts.js'))
			},
			{
				id: "/api/comment",
				pattern: /^\/api\/comment\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/api/follow",
				pattern: /^\/api\/follow\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/follow/_server.ts.js'))
			},
			{
				id: "/api/like",
				pattern: /^\/api\/like\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/like/_server.ts.js'))
			},
			{
				id: "/api/mergeVenues",
				pattern: /^\/api\/mergeVenues\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/mergeVenues/_server.ts.js'))
			},
			{
				id: "/api/newComment",
				pattern: /^\/api\/newComment\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/newComment/_server.ts.js'))
			},
			{
				id: "/auth/email-verification",
				pattern: /^\/auth\/email-verification\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/auth/email-verification/[token]",
				pattern: /^\/auth\/email-verification\/([^/]+?)\/?$/,
				params: [{"name":"token","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/auth/email-verification/_token_/_server.ts.js'))
			},
			{
				id: "/auth/link-accounts",
				pattern: /^\/auth\/link-accounts\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/auth/link-accounts/[token]",
				pattern: /^\/auth\/link-accounts\/([^/]+?)\/?$/,
				params: [{"name":"token","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/auth/link-accounts/_token_/_server.ts.js'))
			},
			{
				id: "/auth/login",
				pattern: /^\/auth\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/auth/login/facebook",
				pattern: /^\/auth\/login\/facebook\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/auth/login/facebook/_server.ts.js'))
			},
			{
				id: "/auth/login/facebook/callback",
				pattern: /^\/auth\/login\/facebook\/callback\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/auth/login/facebook/callback/_server.ts.js'))
			},
			{
				id: "/auth/login/github",
				pattern: /^\/auth\/login\/github\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/auth/login/github/_server.ts.js'))
			},
			{
				id: "/auth/login/github/callback",
				pattern: /^\/auth\/login\/github\/callback\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/auth/login/github/callback/_server.ts.js'))
			},
			{
				id: "/auth/login/google",
				pattern: /^\/auth\/login\/google\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/auth/login/google/_server.ts.js'))
			},
			{
				id: "/auth/login/google/callback",
				pattern: /^\/auth\/login\/google\/callback\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/auth/login/google/callback/_server.ts.js'))
			},
			{
				id: "/auth/password-reset",
				pattern: /^\/auth\/password-reset\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/auth/password-reset/[token]",
				pattern: /^\/auth\/password-reset\/([^/]+?)\/?$/,
				params: [{"name":"token","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/auth/profile",
				pattern: /^\/auth\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/auth/register",
				pattern: /^\/auth\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/auth/settings",
				pattern: /^\/auth\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/blob",
				pattern: /^\/blob\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/comps/comp/[compId]",
				pattern: /^\/comps\/comp\/([^/]+?)\/?$/,
				params: [{"name":"compId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/comps/comp/[compId]/edit",
				pattern: /^\/comps\/comp\/([^/]+?)\/edit\/?$/,
				params: [{"name":"compId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/comps/comp/[compId]/merge",
				pattern: /^\/comps\/comp\/([^/]+?)\/merge\/?$/,
				params: [{"name":"compId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/comps/[eventId]",
				pattern: /^\/comps\/([^/]+?)\/?$/,
				params: [{"name":"eventId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/events",
				pattern: /^\/events\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/events/createEvent",
				pattern: /^\/events\/createEvent\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/events/[eventId]",
				pattern: /^\/events\/([^/]+?)\/?$/,
				params: [{"name":"eventId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/events/[eventId]/edit",
				pattern: /^\/events\/([^/]+?)\/edit\/?$/,
				params: [{"name":"eventId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/import",
				pattern: /^\/import\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/import/update",
				pattern: /^\/import\/update\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/organization",
				pattern: /^\/organization\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/organization/[orgId]",
				pattern: /^\/organization\/([^/]+?)\/?$/,
				params: [{"name":"orgId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/organization/[orgId]/edit",
				pattern: /^\/organization\/([^/]+?)\/edit\/?$/,
				params: [{"name":"orgId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/policy",
				pattern: /^\/policy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/races",
				pattern: /^\/races\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/races/[eventId]",
				pattern: /^\/races\/([^/]+?)\/?$/,
				params: [{"name":"eventId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/results/[raceId]",
				pattern: /^\/results\/([^/]+?)\/?$/,
				params: [{"name":"raceId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/series",
				pattern: /^\/series\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/series/[seriesId]",
				pattern: /^\/series\/([^/]+?)\/?$/,
				params: [{"name":"seriesId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/series/[seriesId]/edit",
				pattern: /^\/series\/([^/]+?)\/edit\/?$/,
				params: [{"name":"seriesId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/terms",
				pattern: /^\/terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/venue",
				pattern: /^\/venue\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/venue/[venueId]",
				pattern: /^\/venue\/([^/]+?)\/?$/,
				params: [{"name":"venueId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/venue/[venueId]/edit",
				pattern: /^\/venue\/([^/]+?)\/edit\/?$/,
				params: [{"name":"venueId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/venue/[venueId]/merge",
				pattern: /^\/venue\/([^/]+?)\/merge\/?$/,
				params: [{"name":"venueId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 38 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

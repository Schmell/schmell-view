<script lang="ts">
	import { cn } from '$lib/utils'
	import { flyAndScale } from '$lib/utils/transitions'
	import { Avatar, Tooltip } from 'bits-ui'

	let _class: string | undefined = undefined
	export { _class as class }
	export let user

	let avatarTip = false
</script>

<Tooltip.Root open={avatarTip}>
	<Tooltip.Trigger>
		<Avatar.Root
			class={cn(
				'absolute top-2 right-8 w-10 h-10 hover:animate-pulse rounded-full overflow-hidden border-2 border-neutral-content bg-black bg-opacity-20 shadow-xl focus:bg-base-100 select-none',
				_class
			)}
		>
			<Avatar.Image src={user?.avatar} alt={user?.username} />
			<Avatar.Fallback class="flex justify-center items-center h-full w-full font-bold ">
				{user?.username.charAt(0)}
			</Avatar.Fallback>
		</Avatar.Root>
	</Tooltip.Trigger>
	<Tooltip.Content
		class="z-20  rounded-xl border border-base-300 bg-neutral px-2 py-2.5 shadow-lg"
		transition={flyAndScale}
		side="left"
		sideOffset={44}
	>
		{user?.username}
		<Tooltip.Arrow />
	</Tooltip.Content>
</Tooltip.Root>

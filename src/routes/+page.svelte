<script lang="ts">
	import { Page } from '$components/layout'
	import Icon from '@iconify/svelte'
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<Page title="Home">
	<div>
		<div class="space-y-4">
			<!--  -->
			<div class="hero bg-base-200">
				<div class="hero-content text-center">
					<div class="max-w-md">
						<h1 class="text-5xl font-bold">
							<span
								class="bg-gradient-to-br from-blue-500 to-green-500 bg-clip-text text-transparent box-decoration-clone"
							>
								Vite Sail is easy
							</span>
						</h1>
						<blockquote class="blockquote">You wont believe that it is soo easy.</blockquote>

						<p class="py-6">
							The Vite Sail Scoring app is the easiest way to post and share your sailing race
							results online. Users will easily be able to get the latest scores by following you
							organiztion or individual events.
						</p>
						<div class="flex gap-2 justify-center">
							<button class="btn btn-primary">
								<Icon icon="mdi:stopwatch-start-outline" /> Get Started
							</button>
							<button class="btn btn-outline btn-base-300">
								<Icon icon="mdi:read-more-outline" />
								Read the Docs
							</button>
						</div>
					</div>
				</div>
			</div>

			<h1 class="flex justify-center font-bold">
				<span> How easy is it? </span>
			</h1>
			<div class="steps p-4">
				<div class="step">
					<div>Register</div>
					<p>
						Step one is to register your organization. <br />
						Each Event is presented by an organization. Don't worry you can have many but you will need
						at least one to get started
					</p>
					<a href="/" class="btn variant-outline block p-4">Register Now!</a>
				</div>
				<div class="step">
					<div>Upload</div>
					<p>
						Currently we are supporting Sailwave files. You don't need to export anything. Just
						upload your .blw file and presto results are posted
					</p>
					<a href="/" class="btn variant-outline block p-4">Upload Now!</a>
				</div>
				<div class="step">
					<div>Share</div>
					<p>
						Share your results easily by sending emails, texts or social posts. Users that are
						already folling your event will get real-time updates and notifications when you publish
						new content
					</p>
					<a href="/" class="btn variant-outline block p-4">Publish Now!</a>
				</div>
			</div>
			<!--  -->
			<div class="hero bg-base-200">
				<div class="hero-content text-center">
					<div class="max-w-md">
						<h1 class="text-5xl font-bold">
							<span
								class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
							>
								Vite means Fast.
							</span>
						</h1>
						<p class="py-6">
							Vite means fast. With highly performant features vite will get your results up and
							pubilished in the blink of an eye. and with user subsriptions to your events you fans
							will get instant updates on the app with real-time data delivered directyl to them.
						</p>
						<div class="flex gap-2 justify-center">
							<button class="btn btn-primary">
								<Icon icon="mdi:stopwatch-start-outline" /> Get Started
							</button>
							<button class="btn btn-outline btn-base-300">
								<Icon icon="mdi:read-more-outline" />
								Read the Docs
							</button>
						</div>
					</div>
				</div>
			</div>

			<h1>Accounts</h1>

			<h3>There are two types of accounts.</h3>
			<h4>User Accounts</h4>
			<p>
				A <b>User account</b> will allow you to follow Organizations, Events, Races or even
				individual competitors.<br /> Users can also add comments, likes etc.. to stay involved with
				a particular community of like minded individuals<br /> This is a free account and allows
				anyone to easily subscribe to events they that are participants of or just big fans. It is
				important to note that users do not need to download an app or install anything to do do
				anything that the app has to offer, but can install it for for performance and convience<br
				/>
			</p>
			<h4>Admin Accounts</h4>
			<p>
				<b>Adimn Accounts</b> can do anyhing a "User Account" can but allows you to add
				Organizations, sereis, events and more. Of course this is where our
				<a href="/">fee structure</a> comes into play.
			</p>
			<p>
				Admin accounts have a one time initiation fee, and a small fee for every event will be
				charged.<br />
				Als each event can have a hosted web page to give your event the polish you desire.
			</p>

			<h1 class="font-bold">
				<span
					class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
				>
					Vite Sail is Fast.
				</span>
			</h1>
			<div class="rounded-tl-[45px] rounded-br-[90px] overflow-hidden">
				<!-- <img src="src/lib/assets/getImage.gif" alt="Spinnaker fun" /> -->
			</div>

			<p>
				Vite means fast. With highly performant features vite will get your results up and
				pubilished in the blink of an eye. and with user subsriptions to your events you fans will
				get instant updates on the app with real-time data delivered directyl to them.
			</p>

			<div class="m-4">
				<a href="/policy" class="text-md font-semibold">View our pirvacy policy</a>
			</div>
			<!-- <a href="/pr"></a> -->
		</div>
	</div>
</Page>

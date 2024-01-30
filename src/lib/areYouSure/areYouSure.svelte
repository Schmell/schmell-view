<script lang="ts">
	import { enhance } from "$app/forms"
	import { page } from "$app/stores"
    import Icon from "@iconify/svelte"
import { Dialog, Label, Separator } from "bits-ui";
	  import { fade } from "svelte/transition"
    let dialogOpen = true;

    // export let href
    // export let item
    export let action: string = ""
    export let severity: string  = 'high'

    $: console.log( action, severity );
  </script>
   
  <Dialog.Root bind:open={dialogOpen}>
    <Dialog.Portal>
        <Dialog.Overlay
          transition={fade}
          transitionConfig={{ duration: 150 }}
          class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        />
        <Dialog.Content
          transition={fade}
          class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] border-2 border-error rounded-xl bg-base-300 sm:max-w-[490px] md:w-full shadow-lg"
        >
        <div 
          class="flex w-full p-2 items-center justify-center text-xl  font-semibold bg-error  rounded-t-xl  shadow-xl"
          class:bg-waring={severity === 'low'}
        >
          Are you sure??
        </div>
      
          <Dialog.Description class="text-sm p-4 text-foreground-alt border=b-2">
            You are about to delete something. Maybe you should think about it before pressing continue.
          </Dialog.Description>
         
          <div class="flex w-full justify-end gap-2 p-2">
            
              <Dialog.Close>
                <button class="btn btn-xs btn-error"> Cancel <Icon icon="mdi:close" /></button>
              </Dialog.Close>
              <form method="post" use:enhance>
                <button 
                  class="btn btn-xs btn-success" 
                  formaction={action}
                  on:click={()=>{dialogOpen = false}}
                > 
                  Accept 
                  <Icon icon="mdi:check" />
                </button>
              </form>
            </div>
          
          <Dialog.Close
            class="absolute right-5 top-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
          >
              <Icon icon="mdi:close" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
  </Dialog.Root>

  <style>
    /* [data-dialog-portal] {
  height: 3rem;
  width: 100%;
  background-color: #3182ce;
  color: #fff;
} */
  </style>
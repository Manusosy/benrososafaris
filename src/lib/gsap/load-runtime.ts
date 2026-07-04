'use client';

type GsapRuntime = {
  gsap: typeof import('gsap').default;
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
  useGSAP: typeof import('@gsap/react').useGSAP;
  TextPlugin: typeof import('gsap/TextPlugin').TextPlugin;
};

let runtimePromise: Promise<GsapRuntime> | null = null;

export function loadGsapRuntime(): Promise<GsapRuntime> {
  if (!runtimePromise) {
    runtimePromise = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('@gsap/react'),
      import('gsap/TextPlugin')
    ]).then(([gsapMod, scrollTriggerMod, useGsapMod, textPluginMod]) => {
      const gsap = gsapMod.default;
      const { ScrollTrigger } = scrollTriggerMod;
      const { useGSAP } = useGsapMod;
      const { TextPlugin } = textPluginMod;

      gsap.registerPlugin(ScrollTrigger, useGSAP, TextPlugin);

      return { gsap, ScrollTrigger, useGSAP, TextPlugin };
    });
  }

  return runtimePromise;
}

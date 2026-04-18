// Character card images — imported so Vite hashes and bundles them properly
import coltCard from "../assets/characters/COLT.jpg";
import veilCard from "../assets/characters/VEIL.jpg";
import vossCard from "../assets/characters/DR_VOSS.jpg";
import fletcherCard from "../assets/characters/FLETCHER.jpg";
import bulletCard from "../assets/characters/BULLET.jpg";
import echoCard from "../assets/characters/ECHO.jpg";
import greyCard from "../assets/characters/GREY.jpg";
import dutchCard from "../assets/characters/DUTCH.jpg";

import coltPortrait from "../assets/characters/portrait_COLT.jpg";
import veilPortrait from "../assets/characters/portrait_VEIL.jpg";
import vossPortrait from "../assets/characters/portrait_VOSS.jpg";
import fletcherPortrait from "../assets/characters/portrait_FLETCHER.jpg";
import bulletPortrait from "../assets/characters/portrait_BULLET.jpg";
import echoPortrait from "../assets/characters/portrait_ECHO.jpg";
import greyPortrait from "../assets/characters/portrait_GREY.jpg";
import dutchPortrait from "../assets/characters/portrait_DUTCH.jpg";

export const CHARACTER_IMAGES: Record<string, { card: string; portrait: string }> = {
  COLT: { card: coltCard, portrait: coltPortrait },
  VEIL: { card: veilCard, portrait: veilPortrait },
  VOSS: { card: vossCard, portrait: vossPortrait },
  FLETCHER: { card: fletcherCard, portrait: fletcherPortrait },
  BULLET: { card: bulletCard, portrait: bulletPortrait },
  ECHO: { card: echoCard, portrait: echoPortrait },
  GREY: { card: greyCard, portrait: greyPortrait },
  DUTCH: { card: dutchCard, portrait: dutchPortrait },
};

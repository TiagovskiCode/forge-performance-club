# FORGE — Image Generation Brief

Eight images carry the whole site. They must read as **one photographic campaign**, shot in **one place**, by **one photographer**.
Until they exist, the site shows clearly identified placeholder artwork from `assets/images/placeholders/` (see "Integration" at the end) — nothing is silently substituted.

---

## 0. The visual bible (applies to every image)

Paste the **STYLE BLOCK** below at the end of every prompt (each prompt already includes it, so you can copy one prompt at a time).

**The world.** A private strength club in a converted 1930s industrial building: raw poured-concrete floor covered in black rubber matting, exposed steel columns and roof trusses, a dark limewashed brick wall, tall steel-framed factory windows with frosted glass, matte-black racks and platforms, bare steel plates. Tungsten work lights hang low; the only colour accent is the warm glow of those lamps. Nothing is new, nothing is shiny, everything is used well.

**The photographer.** Editorial sports-campaign look (think a luxury performance-apparel campaign shot on a full-frame camera). Natural film-like grain, shallow-to-medium depth of field, restrained retouching, real skin texture and fabric texture.

**The grade.** Near-monochrome: neutral, slightly cool deep blacks (never crushed to pure black — keep detail in the shadows), mid-greys of concrete and steel, **warm bone-white highlights**, and a **single small accent of burnt orange (#C65A32)** coming only from a lamp filament, a rim of light or a sliver of window glow. Overall saturation is low. No teal-and-orange blockbuster look. No neon. No lens flare spam. No HDR halos.

**The people.** Real, lean, athletic adults — strong, not bodybuilder-shredded, no exaggerated muscle definition, no glossy oil, no stock-photo smiles. Plain black or charcoal training clothes with **no logos and no text**. Faces are turned away, lowered, in profile or in shadow wherever possible (this also avoids uncanny AI faces). Natural posture, believable grips and stances.

**The never-list.** No readable text, logos, signage or watermarks. No centered, front-facing bodybuilder pose. No smoke machines or fog banks (only a faint haze and a little chalk dust). No oversaturated orange. No cartoon/3D/illustration look. No extra fingers, merged limbs, or warped bars — the barbell must be straight with plates correctly seated on the sleeves.

### STYLE BLOCK (copy into every prompt)

> Photographed like a high-end international sports campaign by an experienced editorial photographer, full-frame camera, natural film grain, realistic skin and fabric texture, restrained retouching. Low-saturation near-monochrome grade: deep neutral-cool blacks with preserved shadow detail, mid-grey concrete and steel, warm bone-white highlights, and one small accent of burnt orange (#C65A32) from a single tungsten lamp or window glow. Converted industrial strength club: raw concrete, black rubber flooring, exposed steel trusses, dark limewashed brick, matte black racks, bare steel plates. Authentic, expensive, quiet and powerful. No text, no logos, no watermark, no neon, no heavy smoke, no cartoon or 3D look, no exaggerated muscles, no stock-photo smiles.

### Consistency workflow (important)
1. Generate **FORGE-01 (hero)** first and pick the best result.
2. In the same ChatGPT conversation, **attach the chosen hero as a reference** for every other image and begin each prompt with: *"Using the attached image as the style, location, lighting and colour-grade reference, create a new photograph of the same club and the same athlete: …"* then paste the prompt.
3. If a result drifts (too orange, too bright, too glossy), reply with *"Keep the composition. Lower saturation, darker blacks, warmer highlights, more grain."*
4. Export JPG (quality ~85) at the sizes below. Do not add text or crops yourself — the website does the cropping.

---

## FORGE-01 — Signature hero (desktop)

| Field | Value |
|---|---|
| **Asset ID** | FORGE-01 |
| **Filename** | `assets/images/forge-hero.jpg` |
| **Website placement** | Section 01 — full-bleed hero background (desktop/tablet), behind the headline "BUILT BY YOU." |
| **Aspect ratio** | **3:2 landscape** (generate native 3:2; the site crops to ~16:9 / 21:9 with `object-fit: cover`, so keep everything important inside the central horizontal 65% of the height) |
| **Resolution** | 1536 × 1024 (native). If you can upscale, 3072 × 2048 is ideal. Max ~400 KB after JPG export. |

**Purpose.** The first impression: a still, powerful moment *before* the lift. It must communicate discipline, weight and quiet confidence in one frame.

**Composition.** Camera at hip height, slightly low, 85 mm look, shallow-to-medium depth of field. The athlete is in **profile, facing frame-left toward the empty space**, in the **right third** of the frame, standing at a loaded barbell on the floor, hands chalked, one hand wrapped around the bar at mid-shin height, head lowered, about to pull. The figure occupies roughly 65% of the image height, so the silhouette is strong and readable. **The left 50–55% of the frame is dark, calm negative space** (dark limewashed brick wall and concrete floor fading into shadow). Foreground: the end of the barbell sleeve and a stack of plates slightly out of focus at the bottom-right edge, giving depth. Background: out-of-focus steel columns and one tall frosted factory window far behind.

**Lighting.** One large, soft key light from **upper frame-right/behind the athlete** creating a bright rim along the shoulder, back and arm, with the face in shadow; a faint cool fill from the window. A single warm tungsten lamp low in the background gives the only orange accent. A faint haze and a little suspended **chalk dust** catches the rim light (subtle — not fog). Deep shadows keep texture in the concrete and the black clothing. Warm bone highlights, neutral-cool shadows.

**Subject details.** Lean athletic person (adult), black fitted training top and shorts or tights with no logos, bare steel barbell with visible knurling, black bumper plates, chalk on hands and forearms, black rubber floor with scuffs, a few chalk marks on the concrete.

**Color grading.** Near-monochrome, low saturation, deep blacks with detail, warm bone highlights, ONE small burnt-orange accent (lamp or glowing rim).

**Text-safe areas.** Left 55% of the frame and the bottom 25% (headline "BUILT BY YOU." sits bottom-left at very large size and must stay readable). No bright objects or busy detail there.

**Image-generation prompt (copy-ready):**

> A cinematic wide editorial photograph, 3:2 landscape. Inside a converted industrial strength club, a lean athletic adult in profile faces left, standing in the right third of the frame at a loaded steel barbell resting on a black rubber floor, one chalked hand gripping the knurled bar at mid-shin height, head lowered, a still moment just before a heavy deadlift. Black fitted training clothes, no logos. The athlete fills about 65% of the frame height with a strong, clean silhouette. The left half of the frame is calm dark negative space: a dark limewashed brick wall and concrete floor falling into deep shadow. In the foreground bottom-right, the end of the barbell sleeve and stacked black plates, softly out of focus. In the far background, out-of-focus steel columns and one tall frosted factory window. A large soft key light from upper right behind the athlete draws a bright rim along the shoulder, back and arm, the face in shadow; a faint cool fill from the window; one small warm tungsten lamp low in the background is the only orange accent. A subtle haze and a little suspended chalk dust catch the light. Camera at hip height, slightly low angle, 85mm lens, shallow-to-medium depth of field. Preserve rich detail in the shadows. [STYLE BLOCK]

**Implementation notes.** `object-position: 62% 50%` on desktop. The image is revealed with a clip-path mask (inset → full) while it settles from scale 1.25 → 1, then drifts very slowly (≈4% over 20 s). On scroll the image scales and darkens slightly as the Philosophy section rises over it.

---

## FORGE-02 — Hero (mobile crop)

| Field | Value |
|---|---|
| **Asset ID** | FORGE-02 |
| **Filename** | `assets/images/forge-hero-mobile.jpg` |
| **Website placement** | Section 01 — hero background on screens ≤ 700 px wide (loaded via `<picture>`) |
| **Aspect ratio** | **2:3 portrait** (the site crops to ~9:16 with `object-fit: cover`; keep the subject inside the central 70% of the height) |
| **Resolution** | 1024 × 1536 (native). Max ~250 KB after export. |

**Why a separate asset.** A 3:2 landscape cropped to a phone would either cut the athlete or shrink them to a sliver. The mobile headline sits at the bottom, so the composition must be rebuilt vertically.

**Composition.** Same moment, same athlete, same club, re-framed for portrait: athlete in profile facing left, centred slightly right, occupying the **upper-middle** of the frame (from ~12% to ~62% of the height), standing at the loaded barbell with the chalked hand on the bar. The **lower 35%** is dark rubber floor and the barbell/plates falling into shadow (text-safe zone for the headline, copy and buttons). The top 12% is dark brick wall. Background: out-of-focus steel column and a window glow at upper-left.

**Lighting / grading.** Identical to FORGE-01 (rim light from upper right behind the athlete, face in shadow, one small warm lamp accent, near-monochrome).

**Text-safe areas.** Bottom 35–40% (headline, copy, CTAs) and the top 12% (navigation).

**Image-generation prompt (copy-ready — attach FORGE-01 as reference):**

> Using the attached image as the style, location, lighting and colour-grade reference, create a new vertical 2:3 portrait photograph of the same athlete in the same industrial strength club, in the same moment just before a heavy deadlift. The athlete is in profile facing left, positioned centre-right in the upper-middle of the frame, gripping the knurled bar with a chalked hand, head lowered. The athlete occupies the area from about 12% to 62% of the frame height. The lower 35% of the frame is dark black rubber flooring, the barbell and black plates falling into soft shadow with no bright detail. The top 12% is dark limewashed brick. A large soft key light from upper right behind the athlete draws a bright rim along the shoulder and back, face in shadow; a single small warm tungsten lamp in the background is the only orange accent; faint haze and a little chalk dust. Camera at hip height, 85mm, shallow depth of field. [STYLE BLOCK]

**Implementation notes.** `object-position: 50% 30%`. Same reveal and drift as desktop but without scroll parallax.

---

## FORGE-03 — Philosophy detail (chalked hands on the bar)

| Field | Value |
|---|---|
| **Asset ID** | FORGE-03 |
| **Filename** | `assets/images/forge-detail-hands.jpg` |
| **Website placement** | Section 02 — The FORGE Philosophy. A tall image on a bone-coloured surface that **straddles the boundary** between the hero and the philosophy section (the top of the image overlaps the dark hero). |
| **Aspect ratio** | **2:3 portrait** (displayed at ~4:5 on desktop, ~4:3 on mobile — keep the subject centred) |
| **Resolution** | 1024 × 1536 (native). Max ~250 KB. |

**Purpose.** The "unexpected visual detail": the physical, tactile truth of the brand — grip, steel, chalk. It says *work* without a face or a pose.

**Composition.** Macro-to-close-up, camera slightly above and in front, 100 mm macro look, shallow depth of field. Two chalked hands in an overhand grip on a straight steel bar, running diagonally from lower-left to upper-right. Focus on the knurling and the knuckles; the forearms fall into shadow at the frame edges. A cloud of chalk dust hangs just above the hands, lit by the rim light. The top 20% of the frame is dark and soft (it overlaps the dark hero).

**Lighting.** Hard-ish directional light from camera-left grazing the knurling to show texture; deep shadow elsewhere; a faint warm glow from a lamp behind the bar is the only orange accent. Warm bone highlights on chalk and steel.

**Subject details.** Real skin with creases and small scars, chalk caked in the creases, a few chalk smudges on the bar, black rubber floor out of focus below, no jewellery, no logos, no wristbands.

**Text-safe areas.** None required (text sits beside the image, not on it).

**Image-generation prompt (copy-ready — attach FORGE-01 as reference):**

> Using the attached image as the style, location, lighting and colour-grade reference, create a new vertical 2:3 close-up photograph: two chalked hands gripping a straight knurled steel barbell in an overhand grip, the bar running diagonally from lower-left to upper-right. 100mm macro look, shallow depth of field, sharp focus on the knurling and knuckles. Chalk caked in the creases of real, weathered skin; a cloud of white chalk dust hanging just above the hands, lit from behind. Hard directional light from camera left grazing the steel to reveal the knurl texture, deep shadow elsewhere, a faint warm tungsten glow behind the bar as the only orange accent. The forearms fall into shadow at the frame edges; the top 20% of the frame is dark and soft; black rubber floor out of focus at the bottom. No jewellery, no logos, no wristbands. [STYLE BLOCK]

**Implementation notes.** Displayed in a mask that wipes upward on entry (`clip-path` inset → full) with the image settling 1.15 → 1. Moves slightly faster than the text beside it on scroll (vertical parallax ±5%) to create depth across the section boundary.

---

## FORGE-04 — The training floor (wide architecture)

| Field | Value |
|---|---|
| **Asset ID** | FORGE-04 |
| **Filename** | `assets/images/forge-floor-wide.jpg` |
| **Website placement** | Section 03 — Training Experience, interactive service index: the image shown for tab 01 "Strength floor" (16:10 frame beside the tab list). |
| **Aspect ratio** | **3:2 landscape** (displayed in a 16:10 frame — keep the vanishing point and window wall centred) |
| **Resolution** | 1536 × 1024 (native), 3072 × 2048 if upscaled. Max ~400 KB. |

**Purpose.** Make the imagined club tangible and desirable: a serious, beautiful room.

**Composition.** One-point perspective down the length of the converted hall, camera at about eye height centred in the aisle, 24–28 mm look, deep depth of field. Left and right: a continuous run of matte-black power racks and platforms with loaded barbells and plates neatly racked, steel columns repeating into the distance. Black rubber floor with soft reflections. Overhead: steel trusses and a row of low-hung tungsten lamps receding toward a far wall of tall frosted factory windows glowing softly. **No people**, or one tiny distant figure at the far end for scale. The upper-left third is quiet dark truss and wall (text-safe).

**Lighting.** Low-key; pools of warm tungsten light from the hanging lamps, cool diffuse window light at the far end, deep shadow in the corners, subtle haze in the beams. The lamps are the only orange accents; keep them small and warm, not saturated.

**Color grading.** Same near-monochrome grade; warm highlights; deep neutral-cool blacks with detail.

**Text-safe areas.** Upper-left 45% × top 50% of the frame (headline overlay). Keep bright lamps out of this region.

**Image-generation prompt (copy-ready — attach FORGE-01 as reference):**

> Using the attached image as the style, location, lighting and colour-grade reference, create a new wide 3:2 landscape architectural photograph of the same converted industrial strength club, looking down the length of the hall in one-point perspective from eye height in the centre aisle. On both sides, continuous rows of matte-black power racks and lifting platforms with neatly racked steel barbells and black plates; steel columns repeating into the distance; black rubber floor with soft reflections. Overhead, exposed steel trusses and a row of low-hung warm tungsten lamps receding toward a far wall of tall frosted factory windows glowing softly. No people. 26mm lens, deep depth of field, low-key lighting with pools of warm light and cool window light, a faint haze in the light beams. The upper-left third of the frame is calm dark truss and wall with no bright lights. [STYLE BLOCK]

**Implementation notes.** Full-bleed band with a slow vertical parallax and a subtle scale 1.12 → 1 as it enters; heading lines reveal over it with an overflow-hidden mask. The bottom of the image fades into the section's obsidian surface.

---

## FORGE-05 — Personal coaching moment

| Field | Value |
|---|---|
| **Asset ID** | FORGE-05 |
| **Filename** | `assets/images/forge-coaching.jpg` |
| **Website placement** | Section 03 — Training Experience, interactive service index: the image shown for tab 02 "Personal training" (16:10 frame). |
| **Aspect ratio** | **3:2 landscape** (displayed in a 16:10 frame; keep the hands and bar in the central 60%) |
| **Resolution** | 1536 × 1024 (native). Max ~300 KB. |

**Purpose.** Show what *coaching* feels like here: close, quiet, attentive — a coach and a member, one bar between them.

**Composition.** Medium shot, camera at waist height from the side, 50 mm look. A coach crouches beside a barbell at a rack, one hand lightly adjusting the athlete's grip position on the bar, the other holding a small notebook/clipboard against the knee. The athlete stands over the bar, hands on it, head down. **Both faces are turned away, lowered or in shadow.** The coach's hands and the athlete's hands near the bar are the visual focus, in the lower-middle of the frame. Soft background: rack uprights and a window glow.

**Lighting.** Soft, directional daylight from a tall factory window at frame-left, a gentle falloff to shadow at frame-right, bone highlights on shoulders and the steel, and one small warm tungsten lamp behind them as the only orange accent.

**Subject details.** Coach in a charcoal long-sleeve and black trousers; athlete in black training clothes; no logos; no readable writing on the notebook (blank or blurred lines).

**Text-safe areas.** None required.

**Image-generation prompt (copy-ready — attach FORGE-01 as reference):**

> Using the attached image as the style, location, lighting and colour-grade reference, create a new wide 3:2 landscape photograph in the same industrial strength club: a coach in a charcoal long-sleeve crouches beside a barbell at a matte-black power rack, one hand lightly adjusting the athlete's grip on the bar, the other holding a small blank notebook against the knee. The athlete stands over the bar in black training clothes, hands on the bar, head lowered. Both faces are turned away or in shadow. The hands and the bar are the focal point in the centre of the frame, with the rack uprights framing both sides. 50mm lens, camera at waist height from the side, shallow depth of field, soft background of rack uprights and a glowing frosted factory window. Soft directional window light from frame-left with falloff to shadow on the right; a single small warm tungsten lamp behind them is the only orange accent. No readable text anywhere. [STYLE BLOCK]

**Implementation notes.** Shown when the visitor selects "Personal training"; it wipes in from the right (clip-path) while settling from scale 1.12 → 1.

---

## FORGE-07 — Performance coaching (conditioning)

| Field | Value |
|---|---|
| **Asset ID** | FORGE-07 |
| **Filename** | `assets/images/forge-conditioning.jpg` |
| **Website placement** | Section 03 — Training Experience, interactive service index: tab 03 "Performance coaching" (16:10 frame). |
| **Aspect ratio** | **3:2 landscape** (displayed 16:10; keep the action in the central 60%) |
| **Resolution** | 1536 × 1024 (native). Max ~300 KB. |

**Purpose.** Show coached conditioning as controlled intensity — effort, not chaos.

**Composition.** 35 mm look, camera low at knee height, three-quarter side view. One athlete mid-push on a weighted sled across a dark turf lane, body angled low, arms locked, shot as a strong diagonal from lower-left to centre-right. Behind, out of focus: a row of air bikes and a rower, and a coach standing with arms folded watching (back to camera or in shadow). Chalk dust and turf fibres caught in the light near the sled.

**Lighting.** Hard backlight from the factory windows behind (silhouette edges on the athlete's shoulders and the sled frame), one warm tungsten lamp at frame-right as the orange accent, deep shadow in the foreground floor.

**Subject details.** Black training clothes, no logos, worn steel sled with plates, dark green-black turf (desaturated, nearly charcoal), black rubber floor at the edges.

**Text-safe areas.** None required.

**Image-generation prompt (copy-ready — attach FORGE-01 as reference):**

> Using the attached image as the style, location, lighting and colour-grade reference, create a new wide 3:2 landscape photograph in the same industrial strength club: an athlete in black training clothes pushes a loaded steel sled across a dark, desaturated charcoal turf lane, body low and angled, arms locked, forming a strong diagonal from lower left to centre right. Camera low at knee height, three-quarter side view, 35mm lens. Out of focus behind: a row of air bikes and a rower, and a coach standing with arms folded in shadow. Hard backlight from tall frosted factory windows rims the athlete's shoulders and the sled frame; chalk dust and turf fibres catch the light; a single warm tungsten lamp at frame right is the only orange accent. Deep shadow on the foreground floor. No logos, no text. [STYLE BLOCK]

**Implementation notes.** Wipes in from the right when the tab is selected; no parallax inside the frame.

---

## FORGE-08 — Recovery & changing

| Field | Value |
|---|---|
| **Asset ID** | FORGE-08 |
| **Filename** | `assets/images/forge-recovery.jpg` |
| **Website placement** | Section 03 — Training Experience, interactive service index: tab 04 "Recovery" (16:10 frame). |
| **Aspect ratio** | **3:2 landscape** (displayed 16:10) |
| **Resolution** | 1536 × 1024 (native). Max ~300 KB. |

**Purpose.** The quiet counterpoint: calm, clean, unhurried. It tells the visitor the club respects recovery — without claiming medical or spa services.

**Composition.** 50 mm look, eye height. A mobility area by a tall factory window: a low black bench with a neatly folded bone-coloured towel, three black foam rollers lined up on a rubber mat, a resistance band coiled beside them. An athlete sits on the floor in the right third, back against the wall, stretching one leg, face turned to the window and in soft shadow. Lots of quiet space; the left 40% is soft window light on concrete.

**Lighting.** Soft, diffuse daylight from the window at frame-left, low contrast for FORGE (but blacks still rich), gentle warm bias in the highlights, a tiny warm lamp glow far right.

**Subject details.** No branded equipment, no medical devices, no plants or spa clichés, no candles. Lockers barely visible out of focus in the background.

**Text-safe areas.** None required.

**Image-generation prompt (copy-ready — attach FORGE-01 as reference):**

> Using the attached image as the style, location, lighting and colour-grade reference, create a new wide 3:2 landscape photograph of a quiet mobility and recovery corner in the same industrial strength club: soft diffuse daylight from a tall frosted factory window at frame left falls on a raw concrete wall and a black rubber mat; a low black bench with a neatly folded bone-white towel; three black foam rollers lined up and a coiled resistance band. An athlete in black training clothes sits on the floor in the right third, back against the wall, gently stretching one leg, face turned towards the window in soft shadow. 50mm lens at eye height, calm and unhurried, generous negative space, blacks still rich, highlights warm, a tiny warm lamp glow far right as the only orange accent. Lockers barely visible and out of focus behind. No logos, no text, no spa clichés. [STYLE BLOCK]

**Implementation notes.** Wipes in from the right when the tab is selected.

---

## FORGE-06 — Campaign image ("FORGE YOUR LEGACY.")

| Field | Value |
|---|---|
| **Asset ID** | FORGE-06 |
| **Filename** | `assets/images/forge-campaign.jpg` |
| **Website placement** | Section 05 — Cinematic Campaign: the single pinned sequence. The image expands from an inset frame to full-bleed as the visitor scrolls; "FORGE YOUR LEGACY." is revealed over it. |
| **Aspect ratio** | **3:2 landscape** (site crops to ~16:9; on mobile it is cropped to a tall frame centred on the silhouette — keep the subject in the **central third**) |
| **Resolution** | 1536 × 1024 (native), 3072 × 2048 if upscaled. Max ~400 KB. |

**Purpose.** The emotional peak. Not effort — *aftermath and resolve*: the athlete standing over the bar, back-lit, the work done and the work still to do.

**Composition.** Low camera (knee height), 35 mm look, looking slightly up. A lone athlete stands in the **central third**, full figure, **seen from behind in near-silhouette**, standing over a loaded barbell lying on the floor, hands hanging loose, shoulders rising and falling. Beyond them, a **tall steel-framed factory window** floods the far wall with warm bone-white light, the athlete's edges glowing. Floor: black rubber with a long soft reflection of the window and the barbell. **Huge negative space** left and right: dark brick and trusses on the left, deep shadow on the right. The top 35% is dark roof structure (text-safe for the monumental headline).

**Lighting.** Strong **backlight** from the window (this is the opposite of the hero's side-rim light — the same place, the opposite mood); the athlete is a silhouette with a thin bright edge; chalk dust glows in the light shaft; deep blacks with preserved texture in the floor; the window light skews warm bone, a tiny orange glow from a lamp at far left.

**Color grading.** Same near-monochrome grade; highlights bone-white with a slightly warm bias; the window is bright but not blown to pure white with a neon edge.

**Text-safe areas.** Top 35% across the full width and the left 40% of the frame. The headline "FORGE YOUR LEGACY." overlays these areas at monumental size.

**Image-generation prompt (copy-ready — attach FORGE-01 as reference):**

> Using the attached image as the style, location, lighting and colour-grade reference, create a new wide 3:2 landscape cinematic photograph in the same industrial strength club. A lone athlete in black training clothes stands in the central third of the frame, full figure seen from behind in near-silhouette, hands hanging loose, standing over a loaded barbell lying on the black rubber floor. Beyond them, a tall steel-framed frosted factory window fills the far wall with warm bone-white light, rim-lighting the athlete's shoulders and head with a thin bright edge; chalk dust glows in the light shaft. The long soft reflection of the window and the barbell runs across the floor toward the camera. Low camera at knee height, slightly looking up, 35mm lens. Large areas of quiet negative space: dark brick and steel roof trusses fill the top 35% and the left, deep shadow on the right. Deep blacks with preserved texture, no blown-out neon edges. One tiny warm orange lamp glow far left as the only accent. [STYLE BLOCK]

**Implementation notes.** Pinned for ~120% of a viewport height only. The image's clip-path animates from `inset(16% 12%)` to `inset(0)` while it scales 1.2 → 1; the three headline lines slide up out of overflow-hidden masks in sequence; the bottom of the image fades into the obsidian final section. On mobile there is no pin: a simple masked reveal on entry.

---

## Integration

The site already references these **exact filenames**. When a file is missing, the page automatically falls back to the matching placeholder below (the browser console shows a 404 for each missing JPG until it is added). Nothing else needs editing — drop the eight JPGs into `assets/images/`.

| Asset | Expected file | Placeholder used until it exists |
|---|---|---|
| FORGE-01 | `assets/images/forge-hero.jpg` | `assets/images/placeholders/forge-hero.svg` |
| FORGE-02 | `assets/images/forge-hero-mobile.jpg` | `assets/images/placeholders/forge-hero-mobile.svg` |
| FORGE-03 | `assets/images/forge-detail-hands.jpg` | `assets/images/placeholders/forge-detail-hands.svg` |
| FORGE-04 | `assets/images/forge-floor-wide.jpg` | `assets/images/placeholders/forge-floor-wide.svg` |
| FORGE-05 | `assets/images/forge-coaching.jpg` | `assets/images/placeholders/forge-coaching.svg` |
| FORGE-06 | `assets/images/forge-campaign.jpg` | `assets/images/placeholders/forge-campaign.svg` |
| FORGE-07 | `assets/images/forge-conditioning.jpg` | `assets/images/placeholders/forge-conditioning.svg` |
| FORGE-08 | `assets/images/forge-recovery.jpg` | `assets/images/placeholders/forge-recovery.svg` |

### QA checklist after generating
- [ ] No readable text, logos or watermarks anywhere.
- [ ] Hero: negative space is genuinely dark on the left 55% and bottom 25%.
- [ ] All eight share the same blacks, the same warm highlights and the same single orange accent.
- [ ] Barbells are straight; plates are seated on sleeves; hands have five fingers.
- [ ] Orange is a *small* accent — if a photo looks orange overall, regenerate with "lower saturation".

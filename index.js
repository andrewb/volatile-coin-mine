// Keys (k)
// Entities (n)
k = n = []
// Score (s)
// Time (t)
// Time since spawn (u)
// Player x velocity (v)
// Player y velocity (w)
// Player x (x)
// Player frame (z)
s = t = u = v = w = x = z = 0
// Is player alive? (o)
o = 1
// Player y (y)
y = 240
// (S)prite
// a = run length encoded string
// x
// y
// w = width, i.e. rects in row
// s = size of rect
// f = flip
S = (a, x, y, w, s, f) => {
  // Column (q) and row (r)
  q = r = 0
  for (i = 0; i < a.length; i++) {
    // Get color
    // a = feet
    // b = skin/tombstone
    // c = body
    // d = hair/ground
    // e = coin
    // f = background
    // g = boulder
    h = '000fed00ff75fd5533976'.match(/.../g)[a[i].charCodeAt(0) - 97]
    // Use '+' instead of parseInt
    // Non-numeric chars will be NaN
    // Number of repeats
    $ = +a[i + 1]
    $ = $ ? (i++, $) : 1
    for (j = 0; j < $; j++) {
      c.fillStyle = '#' + h
      h && c.fillRect(
        // Get x coord for 'pixel'. If f is truthy, flip by rendering
        // right to left
        ~~(x + (f ? w - q - 1 : q) * s),
        ~~(y + r * s),
        s,
        s
      )
      // Assign and test in one go...
      if (++q == w) {
        q = 0
        r++
      }
    }
  }
}
// (T)ick
(function T(e) {
  // Calculate delta
  // 1e3 is shorter than 1000
  l = (e - t) / 1e3
  // Update time since last spawn
  u += l
  // Animate sprite at 10fps
  // 10 * (e - t) / 1e3 becomes (e - t) / 100
  z += (e - t) / 100
  t = e
  // Draw background
  S('f', 0, 0, 1, 320)
  // Draw floor
  S('d', 0, 280, 1, 320)
  // Text will have the same fill as floor
  c.fillText(s, 10, 20)
  // Spawn every nth seconds
  if (u >= 1) {
    n.push({
      x: (0 | Math.random() * 8) * 40,
      y: 0,
      // Set type (0 = coin, 1 = boulder)
      t: 0 | Math.random() * 2,
      // Set direction (left or right)
      d: [-1, 1][0 | Math.random() * 2]
    })
    // Reset time since last spawn
    u = 0
  }
  // Render and update entities
  // IRL reduce would be a better choice, but map and pushing to a temp array
  // is less bytes
  // Temp array
  f = []
  n.map(e => {
    // Gravity is 160
    e.y += 160 * l
    if (e.y >= 260) {
      e.y = 260
      e.x += 60 * l * e.d
    }
    // IRL we'd want to remove out of bound entities, but that uses up bytes
    // e.g. if (e.x < 320 && e.x > -20)
    // Simple hit detection (also checks if game if player is alive)
    x < e.x + 20 && x + 40 > e.x && y < e.y + 20 && 40 + y > e.y && o
      // Hit, game over if boulder, increment score if coin
      ? e.t ? (f.push(e), o = 0) : s++
      : f.push(e)
    // Draw
    S(e.t ? 'g8g8' : 'xe2xe8xe2', e.x, e.y, 4, 5)
  })
  // Re-assign entities
  n = f

  // Update player
  // Jumping?
  if (o && k[32] && y == 240) {
    w = -120
  }
  // Moving?
  v = o && (k[37] || k[39]) ? k[37] ? -80 : 80 : 0
  // Update y velocity
  // Gravity is 160
  w += 160 * l
  y += w * l
  x += v * l
  // Clamp to bounds (x)
  // if (x > 280) x = 280
  // if (x < 0) x = 0
  x > 280 ? x = 280 : x < 0 ? x = 0 : x
  // Keep player above ground plane (y)
  if (y >= 240) {
    y = 240
    w = 0
  }
  // Draw player
  S(
    [
      'x3d3x5dbx6b3x5bcx6bcx6c2x5ac2x6a2',
      'x3d3x5dbx6b3x5bcx6cbx6c2xax3c3ax4a2',
      'x3d3x5dbx6b3x5bcx5bc2x6c2x4ac4x3ax2a2',
      // Jumping
      'x4dx6d2x6dbx6b3x5bcx6bcx5c4x3a2x2a2',
      // Standing
      'x3d3x5b2x6b2x5bc2bx5bcbx5c2x6c2x6a2',
      // Dead
      'x3b2x6b2x4b6x2b6x4b2x6b2x6b2x6b2'
    ][
      // Ternary maddness
      // Equivalent to
      // if (o) {
      //   if (w) {
      //     j = 3 // Jumping
      //   }
      //   else if (v) {
      //     j = ~~z % 3 // Walking
      //   }
      //   if (o) {
      //     j = 4 // Standing
      //   }
      // } else {
      //   j = 5
      // }
      o ? w ? 3 : v ? ~~z % 3 : 4 : 5
    ],
    x,
    y,
    8,
    5,
    // v < 0 makes more sense, but k[37] packs better
    k[37]
  )
  requestAnimationFrame(T)
})(0)
// x.type is 'keyup' or 'keydown'
// x.type[5] is undefined on 'keyup'
onkeyup = onkeydown = e => k[e.which] = e.type[5]


export { mixer };

function mixer(
  color1, 
  percent1,
  color1Namespace = 'in srgb',
  color2 = 'transparent',
  percent2 = 100 - percent1,
  color2Namespace = null,  
) {
  
  const c2n = color2Namespace ? `${color2Namespace}, ` : '';
  return ( `color-mix(${color1Namespace}, ${color1} ${percent1}%,
   ${c2n} ${color2}, ${percent2}%)`
  );
}

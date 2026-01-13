function PixelDemo() {
  const Scale8 = {
  "--scale8-0": "2px",
  "--scale8-1": "4px",
  "--scale8-2": "8px",
  "--scale8-3": "12px",
  "--scale8-4": "16px",
  "--scale8-5": "24px",
  "--scale8-6": "32px",
  "--scale8-7": "48px",
  "--scale8-8": "64px",
  "--scale8-9": "96px",
  "--scale8-10": "128px",
  "--scale8-11": "160px",
  "--scale8-12": "242px",
  "--scale8-13": "448px"
  };
  /* ----------------------------------------
     Blaine's Spacing Scale
   ---------------------------------------- */
  const ScaleB = {
  "--scaleb-0": "1.25px",
  "--scaleb-1": "2.5px",
  "--scaleb-2": "7.5px",
  "--scaleb-3": "10px",
  "--scaleb-4": "15px",
  "--scaleb-5": "25px",
  "--scaleb-6": "37.5px",
  "--scaleb-7": "50px",
  "--scaleb-8": "75px",
  "--scaleb-9": "100px",
  "--scaleb-10": "125px",
  "--scaleb-11": "175px",
  "--scaleb-12": "250px",
  "--scaleb-13": "450px"
  };
    
    return (
      <>
      <ul>
      {Object.entries(Scale8).map(([key, value]) => (
        <li key={key}>{`${key}: ${value}`}
          <div style={{borderBottom: `16px solid rgba(0, 0, 0, 1)` ,
            width: `${value}`
          }}>
          </div>
        </li>
      ))}
      </ul>
      <ul>
      {Object.entries(ScaleB).map(([key, value]) => (
        <li key={key}>{`${key}: ${value}`}
          <div style={{borderBottom: `16px solid rgba(0, 0, 0, 1)` ,
            width: `${value}`
          }}>
          </div>
        </li>
      ))}
      </ul>
      <ul>
        <li>
          <script>console.log(getComputedStyle(document.documentElement).getPropertyValue('--shell'))</script>
          <div style={{width: `var(--shell)`, height: `var(--global-gutter-lg)`, backgroundColor: `rgba(0, 0, 0, 1)`}}></div>
        </li>
      </ul>

      </>
    );
};
export default PixelDemo;
export { PixelDemo };
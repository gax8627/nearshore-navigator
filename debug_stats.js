
// Mocking react hooks
const useEffect = (cb, deps) => { cb(); };
const useState = (init) => [init, (val) => {}];
const useRef = (init) => ({ current: init });

// Mocking framer-motion
const useSpring = (init, conf) => ({ 
    set: (val) => console.log(`Spring set to: ${val}`), 
    get: () => init 
});
const useTransform = (val, fn) => fn(val.get());

// The component logic
function CountUp({ value, trigger }) {
    console.log(`Input value: "${value}", trigger: ${trigger}`);
    const numberMatch = value.match(/\d+/);
    const number = numberMatch ? parseInt(numberMatch[0]) : 0;
    console.log(`Parsed number: ${number}`);
    
    // Simulate the useEffect
    if (trigger && number > 0) {
        console.log(`Triggering spring to ${number}`);
    } else {
        console.log(`Not triggering spring. Trigger: ${trigger}, Number > 0: ${number > 0}`);
    }
}

// Test cases
console.log("--- Test Case 1: '20 Minutes', Trigger True ---");
CountUp({ value: "20 Minutes", trigger: true });

console.log("\n--- Test Case 2: '0+', Trigger True ---");
CountUp({ value: "0+", trigger: true });

console.log("\n--- Test Case 3: '$50B+', Trigger True ---");
CountUp({ value: "$50B+", trigger: true });

/* =====================
   CALORIE CALCULATOR
   ===================== */
function calculateCalories() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age    = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);

    if (!age || !weight || !height) {
        document.getElementById('calorieResult').textContent = 'Please fill in all fields.';
        return;
    }

    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = Math.round(bmr * activity);
    document.getElementById('calorieResult').textContent =
        `Your daily calorie needs: ${tdee} kcal`;
}

/* =====================
   ARTICLE MODAL
   ===================== */
const articles = [
    {
        cat: 'WORKOUTS',
        catColor: '#ff7a00',
        time: '8 min read',
        title: 'Full-Body Strength Training for Beginners',
        body: `
            <p>Starting your fitness journey doesn't have to be complicated. This 3-day full-body split is designed to build a solid foundation of strength while keeping your sessions short and focused.</p>
            <h4>The plan</h4>
            <p>Train Monday, Wednesday, and Friday. Rest or do light walking on the other days. Each session targets all major muscle groups so nothing gets neglected and your body has time to recover between sessions.</p>
            <h4>Key exercises</h4>
            <p>Goblet squats, push-ups, dumbbell rows, and planks form the core of every session. These compound movements give you the most return on your effort — each one works multiple muscles at once.</p>
            <h4>Progressive overload</h4>
            <p>Add 2.5kg every week on your main lifts. This slow, steady progression is how beginners build the most muscle safely. Don't rush it — the numbers will come.</p>
            <h4>What to expect in month one</h4>
            <p>Your first few weeks will feel uncomfortable. That's normal. By week three, movements start to feel natural. By week four, you'll notice your clothes fitting differently. Stick with it.</p>
        `
    },
    {
        cat: 'NUTRITION',
        catColor: '#6bdb7c',
        time: '6 min read',
        title: 'Eating for Results: The 80/20 Rule',
        body: `
            <p>Forget the idea that you need to eat perfectly to see results. The 80/20 rule says: eat whole, nutrient-dense foods 80% of the time, and don't stress the other 20%.</p>
            <h4>Why it works</h4>
            <p>Sustainability beats perfection every time. Diets that allow flexibility are the ones people actually stick to for months and years. A plan you follow 80% is infinitely better than a perfect plan you quit after two weeks.</p>
            <h4>What 80% looks like</h4>
            <p>Lean proteins (chicken, eggs, fish, legumes), rice, oats, sweet potatoes, vegetables, fruits, and plenty of water. These foods fuel performance and recovery while keeping you full and energized.</p>
            <h4>What 20% looks like</h4>
            <p>A slice of pizza, a dessert, drinks with friends on the weekend. Life happens — and that's completely fine. The goal is consistency over a long period, not a flawless week.</p>
        `
    },
    {
        cat: 'MINDSET',
        catColor: '#5faaff',
        time: '5 min read',
        title: 'The Psychology of Consistency',
        body: `
            <p>Motivation is unreliable. It peaks when you start something new and disappears the moment life gets busy or hard. Consistency, on the other hand, is a skill — and it can be built.</p>
            <h4>The identity shift</h4>
            <p>Instead of "I want to get fit," try "I am someone who works out." Identity-based habits are far more durable than outcome-based goals. When your behavior matches your identity, it stops feeling like discipline.</p>
            <h4>Make it easy</h4>
            <p>Lay out your gym clothes the night before. Pre-book your sessions. Remove as much friction as possible so the decision is already made before you even wake up. The harder it is to skip, the less likely you are to.</p>
            <h4>Track your streak</h4>
            <p>A simple calendar with X marks for each training day creates a visual chain you won't want to break. Jerry Seinfeld called this "don't break the chain" — and it works just as well for fitness as it does for comedy.</p>
        `
    },
    {
        cat: 'RECOVERY',
        catColor: '#c47aff',
        time: '7 min read',
        title: "Rest Days Aren't Lazy Days",
        body: `
            <p>Muscle growth doesn't happen in the gym — it happens during recovery. Your workout is just the stimulus. Rest is where the actual adaptation occurs. Skipping recovery is like planting seeds and never watering them.</p>
            <h4>Active recovery</h4>
            <p>Light walking, stretching, or a 20-minute yoga session keeps blood flowing to sore muscles without adding stress to your central nervous system. This speeds up the repair process without risking overtraining.</p>
            <h4>Sleep is your superpower</h4>
            <p>Aim for 7–9 hours of sleep. Growth hormone is primarily released during deep sleep stages — chronically cutting this short literally slows your progress, regardless of how well you train and eat.</p>
            <h4>Foam rolling</h4>
            <p>Spend 5–10 minutes on tight areas after training. It won't make you stronger, but it reduces soreness, improves range of motion over time, and keeps you consistent by making the next session more comfortable.</p>
        `
    }
];

function openArticle(index) {
    const a = articles[index];
    document.getElementById('modalCat').textContent  = a.cat;
    document.getElementById('modalCat').style.color  = a.catColor;
    document.getElementById('modalTime').textContent = a.time;
    document.getElementById('modalTitle').textContent = a.title;
    document.getElementById('modalBody').innerHTML   = a.body;
    document.getElementById('articleOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeArticle() {
    document.getElementById('articleOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

function closeArticleOnOverlay(event) {
    if (event.target === document.getElementById('articleOverlay')) {
        closeArticle();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeArticle();
});

/* =====================
   WORKOUT GIF HOVER
   ===================== */
const tooltip  = document.getElementById('gifTooltip');
const gifImg   = document.getElementById('gifImg');
const gifTip   = document.getElementById('gifTipText');

const items = document.querySelectorAll('.advanced-item');

items.forEach(function (item) {
    item.addEventListener('mouseenter', function (e) {
        const gifSrc = item.getAttribute('data-gif');
        const tipText = item.getAttribute('data-tip');

        gifImg.src   = gifSrc;
        gifTip.textContent = tipText;
        tooltip.style.display = 'block';
        positionTooltip(e);
    });

    item.addEventListener('mousemove', function (e) {
        positionTooltip(e);
    });

    item.addEventListener('mouseleave', function () {
        tooltip.style.display = 'none';
        gifImg.src = '';
    });
});

function positionTooltip(e) {
    const offset = 20;
    let x = e.clientX + offset;
    let y = e.clientY + offset;

    // Prevent tooltip from going off the right edge
    if (x + 240 > window.innerWidth) {
        x = e.clientX - 240;
    }

    // Prevent tooltip from going off the bottom edge
    if (y + 220 > window.innerHeight) {
        y = e.clientY - 220;
    }

    tooltip.style.left = x + 'px';
    tooltip.style.top  = y + 'px';
}

// נתוני הסרטונים
const videos = [
    {
        id: 1,
        title: "חיתוך אבטיח גדול זכוכית ✨",
        description: "צפו בסרטון האמיתי של חיתוך אבטיח גדול הזכוכית. החיתוך המדויק מתבצע בזהירות רבה כדי ליצור אפקט ויזואלי מרהיב עם צלילי זכוכית ייחודיים.",
        duration: "0:45",
        videoUrl: "Glass_Watermelon_Cutting_Video_Ready.mp4",
        thumbnail: "🍉"
    },
    {
        id: 2,
        title: "חיתוך רימון זכוכית - אמנות הזכוכית",
        description: "צפו בסרטון מרהיב של חיתוך רימון זכוכית. הטכניקה המדויקת יוצרת אפקטים ויזואליים מרהיבים עם צלילי זכוכית ייחודיים.",
        duration: "0:45",
        videoUrl: "Glass_Pomegranate_Cutting_Video_Ready.mp4",
        thumbnail: "🍎"
    },
    {
        id: 3,
        title: "חיתוך תות שדה זכוכית - אמנות עדינה",
        description: "צפו בסרטון מרהיב של חיתוך תות שדה זכוכית. הטכניקה העדינה והמדויקת יוצרת אפקטים ויזואליים מרהיבים.",
        duration: "0:45",
        videoUrl: "Glass_Strawberry_Cutting_Video_Ready.mp4",
        thumbnail: "🍓"
    },
    {
        id: 4,
        title: "חיתוך זכוכית יצירתי - סרטון בונוס",
        description: "סרטון בונוס המציג טכניקת חיתוך זכוכית ייחודית ומרהיבה. צפו בתוצאה הסופית המפתיעה!",
        duration: "0:45",
        videoUrl: "וידאו_מוכן_קישור_כאן.mp4",
        thumbnail: "🎬"
    }
];

// אלמנטים מהדף
const videosGrid = document.getElementById('videosGrid');
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');
const closeModal = document.getElementById('closeModal');

// יצירת כרטיסי הסרטונים
function createVideoCards() {
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="video-thumbnail">
                <span style="font-size: 4rem;">${video.thumbnail}</span>
            </div>
            <div class="video-info">
                <h4 class="video-title">${video.title}</h4>
                <p class="video-description">${video.description}</p>
                <div class="video-duration">⏱️ ${video.duration}</div>
            </div>
        `;
        
        // הוספת אירוע לחיצה
        videoCard.addEventListener('click', () => openVideoModal(video));
        
        videosGrid.appendChild(videoCard);
    });
}

// פתיחת מודל הסרטון
function openVideoModal(video) {
    modalVideo.src = video.videoUrl;
    videoTitle.textContent = video.title;
    videoDescription.textContent = video.description;
    modal.style.display = 'block';
    
    // הוספת אפקט blur לגוף הדף
    document.body.style.overflow = 'hidden';
    
    // התמקדות בסרטון
    setTimeout(() => {
        modalVideo.focus();
    }, 100);
    
    // הוספת אירועי שגיאה לטעינת הסרטון
    modalVideo.onerror = function() {
        showNotification('שגיאה בטעינת הסרטון. וודא שהקובץ נמצא באותה תיקייה.', 'error');
    };
    
    modalVideo.onloadstart = function() {
        showNotification('טוען סרטון...', 'info');
    };
    
    modalVideo.oncanplay = function() {
        showNotification('הסרטון מוכן לצפייה!', 'success');
    };
}

// סגירת המודל
function closeVideoModal() {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = '';
    document.body.style.overflow = 'auto';
}

// אירועים
document.addEventListener('DOMContentLoaded', () => {
    createVideoCards();
    
    // סגירת מודל בלחיצה על X
    closeModal.addEventListener('click', closeVideoModal);
    
    // סגירת מודל בלחיצה מחוץ לוידאו
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoModal();
        }
    });
    
    // סגירת מודל עם מקש Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeVideoModal();
        }
    });
});

// אפקטים נוספים
function addHoverEffects() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// אנימציית טעינה
function showLoadingAnimation() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>טוען סרטונים...</p>
        </div>
    `;
    
    videosGrid.appendChild(loadingDiv);
    
    // הסרת אנימציית הטעינה אחרי זמן קצר
    setTimeout(() => {
        if (loadingDiv.parentNode) {
            loadingDiv.parentNode.removeChild(loadingDiv);
        }
    }, 2000);
}

// פונקציה לחיפוש סרטונים
function searchVideos(query) {
    const filteredVideos = videos.filter(video => 
        video.title.includes(query) || 
        video.description.includes(query)
    );
    
    // ניקוי הגריד
    videosGrid.innerHTML = '';
    
    // יצירת כרטיסים חדשים
    filteredVideos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="video-thumbnail">
                <span style="font-size: 4rem;">${video.thumbnail}</span>
            </div>
            <div class="video-info">
                <h4 class="video-title">${video.title}</h4>
                <p class="video-description">${video.description}</p>
                <div class="video-duration">⏱️ ${video.duration}</div>
            </div>
        `;
        
        videoCard.addEventListener('click', () => openVideoModal(video));
        videosGrid.appendChild(videoCard);
    });
}

// אפקטי רקע דינמיים
function addDynamicBackground() {
    const body = document.body;
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        body.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%) 0%, hsl(${hue + 60}, 70%, 50%) 100%)`;
    }, 10000); // שינוי כל 10 שניות
}

// הוספת אפקטי קול (אופציונלי)
function addSoundEffects() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            // יצירת אפקט קול של זכוכית (אופציונלי)
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        });
    });
}

// הפעלת פונקציות נוספות
document.addEventListener('DOMContentLoaded', () => {
    addHoverEffects();
    showLoadingAnimation();
    // addDynamicBackground(); // ניתן להפעיל אם רוצים רקע דינמי
    // addSoundEffects(); // ניתן להפעיל אם רוצים אפקטי קול
});

// פונקציה להצגת הודעות
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// הוספת CSS לאנימציות
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
    }
    
    .loading-spinner {
        text-align: center;
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid #e74c3c;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 10px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style); 
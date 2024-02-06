let carriageCount = 0;
let dragged;

   

document.addEventListener('DOMContentLoaded', (event) => {
    const train = document.getElementById('train');

    // สร้างฟังก์ชันเพิ่มโบกี้ใหม่
    window.addCarriage = function() {
        carriageCount++;
        const newCarriage = document.createElement('div');
        newCarriage.className = 'carriage';
        newCarriage.setAttribute('draggable', true);
        newCarriage.id = 'carriage' + carriageCount;
        newCarriage.textContent = 'โบกี้ ' + carriageCount;
        train.appendChild(newCarriage);
        addDragEvents(newCarriage);
    };

    const addDragEvents = (item) => {
        item.addEventListener('dragstart', (e) => {
            dragged = item;
            e.dataTransfer.setData('text/plain', item.id);
        });
    };

    // จัดการกับการลากและวาง
    // (เพิ่มเหตุการณ์ dragover และ drop ตามตัวอย่างก่อนหน้า)
 train.addEventListener('dragover', (e) => {
        e.preventDefault(); // อนุญาตให้วาง
    });

    train.addEventListener('drop', (e) => {
        e.preventDefault();
        if (dragged && e.target.className === 'carriage') {
            // หาโบกี้ที่อยู่ใกล้ที่สุดและวางโบกี้ที่ลากมาก่อนหรือหลัง
            const afterElement = getDragAfterElement(train, e.clientX);
            if (afterElement == null) {
                train.appendChild(dragged);
            } else {
                train.insertBefore(dragged, afterElement);
            }
        }
    });

// ฟังก์ชันหาโบกี้ที่ควรจะวางโบกี้ที่ลากมาต่อหน้าหรือหลัง
function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll('.carriage:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

});

// เหตุการณ์ dragover และ drop สามารถเพิ่มตามตัวอย่างก่อนหน้า

// ฟังก์ชันสำหรับแสดง status ของโบกี้ที่เลือก
function showCarriageStatus(carriage) {
    // หาตำแหน่งของโบกี้ที่เลือกในรายการ
    const carriages = document.querySelectorAll('.carriage');
    let index = -1;
    for (let i = 0; i < carriages.length; i++) {
        if (carriages[i] === carriage) {
            index = i;
            break;
        }
    }

    // ตรวจสอบว่าโบกี้ที่เลือกเป็นโบกี้แรกของขบวนหรือไม่
    if (index === 0) {
        alert("โบกี้นี้คือหัวขบวน");
    } else if (index === carriages.length - 1) {
        alert("โบกี้นี้คือท้ายขบวน");
    } else {
        const nextCarriageIndex = index + 1;
        const nextCarriage = carriages[nextCarriageIndex];
        alert("โบกี้นี้อยู่ข้างหน้าโบกี้ที่ " + (nextCarriageIndex + 1));
    }
}

// ฟังก์ชันสำหรับแสดง status ของโบกี้ที่เลือก
function showCarriageStatus(carriage) {
    // หาตำแหน่งของโบกี้ที่เลือกในรายการ
    const carriages = document.querySelectorAll('.carriage');
    let index = 0;
    for (let i = 1; i < carriages.length; i++) {
        if (carriages[i] === carriage) {
            index = i;
            break;
        }
    }

    // ตรวจสอบว่าโบกี้ที่เลือกเป็นโบกี้แรกของขบวนหรือไม่
    if (index === 0) {
        alert("โบกี้นี้คือหัวขบวน");
    } else if (index === carriages.length - 1) {
        alert("โบกี้นี้คือท้ายขบวน");
    } else {
        const nextCarriageIndex = index + 1;
        const nextCarriage = carriages[nextCarriageIndex];
        alert("โบกี้นี้อยู่ข้างหน้าโบกี้ที่ " + (nextCarriageIndex));
    }
}





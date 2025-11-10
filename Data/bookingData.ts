import { Employee, PaymentMethod, TimeSlot } from '../Types/booking'

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    specialty: 'Senior Hair Stylist',
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&h=150&fit=crop&crop=face',
    available: true
  },
  {
    id: '2',
    name: 'Léa Bernard',
    specialty: 'Color Specialist',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    available: true
  },
  {
    id: '3',
    name: 'Marc Dubois',
    specialty: 'Master Barber',
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    available: false
  },
];

export const paymentMethods: PaymentMethod[] = [
  { id: '1', type: 'card', name: 'Credit/Debit Card', icon: 'card' },
  { id: '2', type: 'cash', name: 'Cash Payment', icon: 'cash' },
  { id: '3', type: 'mobile', name: 'Mobile Payment', icon: 'phone-portrait' },
];

export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 20; // 8 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour;
      const timeString = `${displayHour}:${minute === 0 ? '00' : '30'} ${period}`;
      
      // Mark some slots as unavailable for demo
      const available = !(hour === 12 && minute === 0) && !(hour === 15 && minute === 30) && !(hour === 18 && minute === 0);
      
      slots.push({
        id: `${hour}-${minute}`,
        time: timeString,
        available: available,
        isPopular: (hour === 10 && minute === 0) || (hour === 14 && minute === 0) || (hour === 16 && minute === 30)
      });
    }
  }
  
  return slots;
};

export const generateDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 90; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    dates.push({
      id: i.toString(),
      date: date,
      dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayNames[date.getDay()],
      day: date.getDate(),
      month: monthNames[date.getMonth()],
      fullDate: `${date.getDate()} ${monthNames[date.getMonth()]}`,
      available: true,
      isWeekend: date.getDay() === 0 || date.getDay() === 6
    });
  }
  
  return dates;
};
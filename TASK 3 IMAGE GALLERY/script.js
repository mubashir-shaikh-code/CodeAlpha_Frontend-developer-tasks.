function scrollGallery(direction) {
    const gallery = document.querySelector('.gallery');
    const scrollAmount = 300; 
    gallery.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

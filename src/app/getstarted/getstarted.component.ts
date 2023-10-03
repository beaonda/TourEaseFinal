import { Component } from '@angular/core';

@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.css']
})
export class GetstartedComponent {

  constructor(){
    document.body.classList.add('bodycont');
  }
  
  ngOnInit(){

    var currentSection = 1;
        document.getElementById('nextBtn')!.addEventListener('click', function() {
            var currentVisible = document.querySelector('.section.visible');
            if (currentVisible) {
                currentVisible.classList.remove('visible', 'slide-in');
                currentVisible.classList.add('slide-out-left');
                var nextSection = currentVisible.nextElementSibling;
                currentSection++;
                if (nextSection) {
                    nextSection.classList.add('visible', 'slide-in');
                    document.getElementById('backBtn')!.style.display = 'inline';
                    if (currentSection === 4) {
                        document.getElementById('nextBtn')!.style.display = 'none';
                        document.getElementById('viewMoreBtn')!.style.display = 'inline';
                    }
                }
            }
            updateProgress(currentSection);
        });

        document.getElementById('backBtn')!.addEventListener('click', function() {
            if (currentSection > 1) {
                var currentVisible = document.querySelector('.section.visible');
                if (currentVisible) {
                    currentVisible.classList.remove('visible', 'slide-in');
                    currentVisible.classList.add('slide-out-right');
                    var prevSection = currentVisible.previousElementSibling;
                    currentSection--;
                    if (prevSection) {
                        prevSection.classList.add('visible', 'slide-in');
                    }
                }
            }

            if (currentSection === 1) {
                document.getElementById('backBtn')!.style.display = 'none';
            }

            if (currentSection < 4) {
                document.getElementById('nextBtn')!.style.display = 'inline';
                document.getElementById('viewMoreBtn')!.style.display = 'none';
            }

            updateProgress(currentSection);
        });

        

        // Initially set the first step as active
        updateProgress(currentSection);   

  }

  
}

function toggleOption(element:any) {
  element.classList.toggle('selected');
}

function updateProgress(currentSection:any) {
  var steps = document.querySelectorAll('.section.visible .step');
  steps.forEach(function(step, index) {
      if (index < currentSection) {
          step.classList.add('active');
      } else {
          step.classList.remove('active');
      }
  });

  if (currentSection === 4) {
      document.getElementById('backBtn')!.style.display = 'none';
  }
}

export const createFilmsList = ({sectionTitle = ``, sectionClass = ``, specialClassName = ``, hidden = ``}) => {
  return `<section class="films-list ${sectionClass}">
            <h2 class="films-list__title ${hidden}">${sectionTitle}</h2>
            <div class="films-list__container ${specialClassName}">
            </div>
  </section>`;
};

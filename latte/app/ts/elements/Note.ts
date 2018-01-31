module latte {

    /**
     *
     */
    export class Note extends NoteBase {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
            super();

            LocalEditor.onClick(this.thetext.raw, () => {
               log("click");
            });
        }

        //region Private Methods
        //endregion

        //region Methods
        //endregion

        //region Events
        //endregion

        //region Properties
        //endregion

    }

}
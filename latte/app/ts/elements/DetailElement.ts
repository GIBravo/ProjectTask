module latte {

    /**
     *
     */
    export class DetailElement extends DetailElementBase {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
            super();

            LocalEditor.onClick(this.title.raw, () => {
               log("cambio");
            });
        }

        //region Private Methods
        //endregion

        //region Methods
        btnAdd_click(e){
            this.notes.add( new Note() );
        }
        /**
         * Raises the <c>task</c> event
         */
        onTaskChanged(){
            if(this._taskChanged){
                this._taskChanged.raise();
            }
            this.title.text = this.task.title;
        }
        //endregion

        //region Events
            /**
             * Back field for event
             */
            private _taskChanged: LatteEvent;

            /**
             * Gets an event raised when the value of the task property changes
             *
             * @returns {LatteEvent}
             */
            get taskChanged(): LatteEvent{
            if(!this._taskChanged){
                this._taskChanged = new LatteEvent(this);
            }
            return this._taskChanged;
        }
        //endregion

        //region Properties
        /**
         * Property field
         */
        private _task: Task = null;

        /**
         * Gets or sets task
         *
         * @returns {Task}
         */
        get task(): Task{
            return this._task;
        }

        /**
         * Gets or sets task
         *
         * @param {Task} value
         */
        set task(value: Task){

            // Check if value changed
            let changed: boolean = value !== this._task;

            // Set value
            this._task = value;

            // Trigger changed event
            if(changed){
                this.onTaskChanged();
            }
        }
        //endregion

    }

}
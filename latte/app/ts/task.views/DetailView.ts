module latte {

    /**
     *
     */
    export class DetailView extends ColumnView {

        //region Static
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
            super();
        }

        //region Private Methods
        //endregion

        //region Methods
            /**
             * Override
             */
            onLoad(){
                super.onLoad();
                this.items.add( this.formTask );
            }

            /**
             * Override
             */
            /**onUnsavedChangesChanged(){
                super.onUnsavedChangesChanged();

                log(this.unsavedChanges);

                if( this.unsavedChanges )
                    this.saveChanges();
            }**/

            /**
             * Raises the <c>task</c> event
             */
            onTaskChanged(){
                if(this._taskChanged){
                    this._taskChanged.raise();
                }
                this.formTask.record = this.task;
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

        //region Components
            /**
             * Field for formTask property
             */
            private _formTask: DataRecordFormItem;

            /**
             * Gets the form task
             *
             * @returns {DataRecordFormItem}
             */
            get formTask(): DataRecordFormItem {
            if (!this._formTask) {
                this._formTask = new DataRecordFormItem();

                this.saveItems.add( this._formTask );
            }
            return this._formTask;
        }
        //endregion

    }

}
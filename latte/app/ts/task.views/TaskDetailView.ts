module latte {

    /**
     *
     */
    export class TaskDetailView extends SplitView {

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
             * Override.
             */
            onLoad(){
                super.onLoad();

                this.sideSize = 370;
                this.side = Side.RIGHT;

                let wrap = new View();
                wrap.raw.appendChild( this.detailElement.raw );
                this.sideView = wrap;

                this.view = this.taskView;
            }
        //endregion

        //region Events
        //endregion

        //region Properties
        //endregion

        //region Components

        /**
         * Field for detailElement property
         */
        private _detailElement: DetailElement;

        /**
         * Gets the detail element
         *
         * @returns {DetailElement}
         */
        get detailElement(): DetailElement {
            if (!this._detailElement) {
                this._detailElement = new DetailElement();
            }
            return this._detailElement;
        }


        /**
             * Field for detailView property
             */
            private _detailView: DetailView;

            /**
             * Gets the detail view
             *
             * @returns {DetailView}
             */
            get detailView(): DetailView {
                if (!this._detailView) {
                    this._detailView = new DetailView();
                }
                return this._detailView;
            }

            /**
             * Field for taskView property
             */
            private _taskView: TaskView;

            /**
             * Gets the task view
             *
             * @returns {TaskView}
             */
            get taskView(): TaskView {
                if (!this._taskView) {
                    this._taskView = new TaskView();
                    this._taskView.selectedTaskChanged.add( () => {
                       this.detailElement.task = this._taskView.selectedTask;
                    });
                }
                return this._taskView;
            }
        //endregion

    }

}